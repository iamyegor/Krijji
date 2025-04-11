using System.Net;
using System.Text.RegularExpressions;
using Domain.CryptoDetail;
using Infrastructure.Data;
using Newtonsoft.Json.Linq;
using Serilog;

namespace Infrastructure.Crypto;

public class CryptoDetailService
{
    private readonly HttpClient _httpClient;
    private readonly ApplicationContext _context;

    public CryptoDetailService(HttpClient httpClient, ApplicationContext context)
    {
        _httpClient = httpClient;
        _context = context;
    }

    public async Task FetchCryptoDetails()
    {
        string url = "https://api.coingecko.com/api/v3/coins/list";
        HttpRequestMessage request = CreateRequest(url);

        HttpResponseMessage? response = await SendRequest(request);
        if (response == null)
            return;

        string content = await response.Content.ReadAsStringAsync();
        JArray coins = JArray.Parse(content);

        List<CryptoDetail> cryptoDetails = ProcessCoins(coins);

        await SaveCryptoDetails(cryptoDetails);
    }

    private HttpRequestMessage CreateRequest(string url)
    {
        HttpRequestMessage request = new(HttpMethod.Get, url);

        request.Headers.Add(
            "User-Agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        );
        request.Headers.Add("Accept", "application/json");
        request.Headers.Add("Accept-Language", "en-US,en;q=0.9");
        request.Headers.Add("Connection", "keep-alive");

        return request;
    }

    private async Task<HttpResponseMessage?> SendRequest(HttpRequestMessage request)
    {
        HttpResponseMessage response = await _httpClient.SendAsync(request);

        if (response.StatusCode == HttpStatusCode.TooManyRequests)
        {
            Log.Error("Rate limit reached when fetching crypto list.");
            return null;
        }

        response.EnsureSuccessStatusCode();
        return response;
    }

    private List<CryptoDetail> ProcessCoins(JArray coins)
    {
        List<CryptoDetail> cryptoDetails = [];

        foreach (JToken coin in coins)
        {
            string name = coin["name"]!.ToString();
            string code = coin["symbol"]!.ToString().ToUpper();

            if (Regex.IsMatch(code, @"[\\/:*?""<>|]")) // contains forbidden characters
                continue;

            cryptoDetails.Add(new CryptoDetail(name, code));
        }

        return cryptoDetails;
    }

    private async Task SaveCryptoDetails(List<CryptoDetail> cryptoDetails)
    {
        _context.CryptoDetails.AddRange(cryptoDetails);
        await _context.SaveChangesAsync();
    }
}
