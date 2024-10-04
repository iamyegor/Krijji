using System.Net;
using System.Text.RegularExpressions;
using Domain.Crypto;
using Domain.CryptoName;
using Infrastructure.Data;
using Infrastructure.Hangfire.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using Serilog;

namespace Application.Jobs;

public class GetCryptoCurrenciesJob : IJob
{
    private const string GateApiUrl = "https://api.gateio.ws/api/v4/spot/tickers";
    private const string CoingeckoApiUrl =
        "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd";
    private const string CoingeckoMarketsUrl =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false";

    private readonly ApplicationContext _context;
    private readonly HttpClient _httpClient;

    public GetCryptoCurrenciesJob(IServiceProvider serviceProvider)
    {
        _httpClient = serviceProvider.GetRequiredService<HttpClient>();
        _context = serviceProvider.GetRequiredService<ApplicationContext>();
    }

    public async Task Execute()
    {
        if (await _context.CryptoDetails.CountAsync() == 0)
        {
            await FetchCryptoDetails();
        }

        // First, get the USDT price in USD from CoinGecko
        decimal usdtPriceInUsd = await GetUsdtPriceInUsd();
        if (usdtPriceInUsd == 0)
            throw new Exception("Failed to fetch USDT price in USD from CoinGecko");

        // Then, fetch the crypto rates from Gate.io
        HttpResponseMessage response = await _httpClient.GetAsync(GateApiUrl);
        response.EnsureSuccessStatusCode();
        string content = await response.Content.ReadAsStringAsync();

        JArray tickers = JArray.Parse(content);

        Dictionary<string, decimal> currencyRates = new Dictionary<string, decimal>();

        foreach (JToken ticker in tickers)
        {
            string currencyPair = ticker["currency_pair"]!.ToString();
            decimal lastPrice = decimal.Parse(ticker["last"]!.ToString());

            string[] currencies = currencyPair.Split('_');
            if (currencies.Length != 2 || currencies[1] != "USDT")
                continue;

            string baseCurrency = currencies[0];

            // Only add the currency if it's not already in the dictionary
            if (!currencyRates.ContainsKey(baseCurrency))
            {
                // Convert the rate from USDT to USD
                decimal rateInUsd = lastPrice * usdtPriceInUsd;
                currencyRates[baseCurrency] = rateInUsd;
            }
        }

        List<Crypto> cryptosFromDb = await _context.Cryptos.ToListAsync();

        foreach (KeyValuePair<string, decimal> rate in currencyRates)
        {
            if (cryptosFromDb.Any(c => c.Code == rate.Key))
            {
                Crypto existingCurrency = cryptosFromDb.First(c => c.Code == rate.Key);
                existingCurrency.UpdateRate(rate.Value);
                continue;
            }

            string? name = _context
                .CryptoDetails.Where(n => n.Code == rate.Key)
                .Select(n => n.Name)
                .FirstOrDefault();

            Crypto currency = new Crypto(rate.Key, name, rate.Value, DateTime.UtcNow);

            _context.Cryptos.Add(currency);
        }

        await _context.SaveChangesAsync();
    }

    private async Task FetchCryptoDetails()
    {
        int page = 1;
        int maxPages = 10;
        List<CryptoDetail> cryptoDetails = [];

        while (page <= maxPages)
        {
            string url = $"{CoingeckoMarketsUrl}&page={page}";

            HttpRequestMessage request = new(HttpMethod.Get, url);

            // Add headers that mimic a browser request
            request.Headers.Add(
                "User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            );
            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("Accept-Language", "en-US,en;q=0.9");
            request.Headers.Add("Connection", "keep-alive");

            HttpResponseMessage response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            if (response.StatusCode == HttpStatusCode.TooManyRequests)
            {
                Log.Error(
                    $"Rate limit reached after fetching {cryptoDetails.Count} crypto details."
                );
                break;
            }

            response.EnsureSuccessStatusCode();
            string content = await response.Content.ReadAsStringAsync();
            JArray coins = JArray.Parse(content);

            foreach (JToken coin in coins)
            {
                string name = coin["name"]!.ToString();
                string code = coin["symbol"]!.ToString().ToUpper();
                string imageUrl = coin["image"]!.ToString();

                if (Regex.IsMatch(code, @"[\\/:*?""<>|]")) // contains forbidden characters
                    continue;

                // Download the image
                string fileName = $"{code}.png";
                string filePath = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                    "cryptos",
                    fileName
                );

                try
                {
                    using HttpResponseMessage imageResponse = await _httpClient.GetAsync(imageUrl);
                    if (imageResponse.IsSuccessStatusCode)
                    {
                        using FileStream fs = new FileStream(filePath, FileMode.Create);
                        await imageResponse.Content.CopyToAsync(fs);
                    }

                    cryptoDetails.Add(new CryptoDetail(name, code, fileName));
                }
                catch
                { // ignored
                }
            }

            if (coins.Count < 250)
                break;

            page++;
        }

        _context.CryptoDetails.AddRange(cryptoDetails);
        await _context.SaveChangesAsync();
    }

    private async Task<decimal> GetUsdtPriceInUsd()
    {
        HttpResponseMessage response = await _httpClient.GetAsync(CoingeckoApiUrl);
        response.EnsureSuccessStatusCode();
        string content = await response.Content.ReadAsStringAsync();

        JObject json = JObject.Parse(content);
        return json["tether"]!["usd"]!.Value<decimal>();
    }
}
