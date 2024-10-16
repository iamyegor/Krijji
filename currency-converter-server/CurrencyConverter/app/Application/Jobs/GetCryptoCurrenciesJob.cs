using Domain.Crypto;
using Domain.UpdateTimestamp;
using Infrastructure.Crypto;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using Quartz;

namespace Application.Jobs;

public class GetCryptoCurrenciesJob : IJob
{
    private const string GateApiUrl = "https://api.gateio.ws/api/v4/spot/tickers";
    private const string CoingeckoApiUrl =
        "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd";

    private readonly ApplicationContext _context;
    private readonly HttpClient _httpClient;
    private readonly CryptoDetailService _cryptoDetailsService;

    public GetCryptoCurrenciesJob(IServiceProvider serviceProvider)
    {
        _httpClient = serviceProvider.GetRequiredService<HttpClient>();
        _context = serviceProvider.GetRequiredService<ApplicationContext>();
        _cryptoDetailsService = serviceProvider.GetRequiredService<CryptoDetailService>();
    }

    public async Task Execute(IJobExecutionContext context)
    {
        if (await _context.CryptoDetails.CountAsync() == 0)
            await _cryptoDetailsService.FetchCryptoDetails();

        decimal? usdtPriceInUsd = await GetUsdtPriceInUsd();
        if (usdtPriceInUsd == null)
            return;

        HttpResponseMessage response = await _httpClient.GetAsync(GateApiUrl);
        try
        {
            response.EnsureSuccessStatusCode();
        }
        catch (HttpRequestException ex)
            when (ex.Message.Contains("Resource temporarily unavailable"))
        {
            return;
        }

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
                decimal rateInUsd = lastPrice * usdtPriceInUsd.Value;
                currencyRates[baseCurrency] = rateInUsd;
            }
        }

        currencyRates.Add("USDT", usdtPriceInUsd.Value);

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

            Crypto currency = new Crypto(rate.Key, name, rate.Value);

            _context.Cryptos.Add(currency);
        }

        UpdateLastUpdatedTimestamp();

        await _context.SaveChangesAsync();
    }

    private void UpdateLastUpdatedTimestamp()
    {
        UpdateTimestamp? fiatUpdateTimestamp = _context.UpdateTimestamps.SingleOrDefault(x =>
            x.Name == UpdateTimestamp.Crypto
        );
        if (fiatUpdateTimestamp != null)
        {
            fiatUpdateTimestamp.Update();
        }
        else
        {
            fiatUpdateTimestamp = UpdateTimestamp.CreateCrypto();
            _context.UpdateTimestamps.Add(fiatUpdateTimestamp);
        }
    }

    private async Task<decimal?> GetUsdtPriceInUsd()
    {
        HttpResponseMessage response;
        try
        {
            response = await _httpClient.GetAsync(CoingeckoApiUrl);
        }
        catch (HttpRequestException ex)
            when (ex.Message.Contains("Resource temporarily unavailable"))
        {
            return null;
        }

        response.EnsureSuccessStatusCode();
        string content = await response.Content.ReadAsStringAsync();

        JObject json = JObject.Parse(content);
        return json["tether"]!["usd"]!.Value<decimal>();
    }
}
