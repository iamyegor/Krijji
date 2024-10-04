using Domain.Currency;

namespace Infrastructure.Banks.Canada;

public class BankOfCanada
{
    private readonly HttpClient _client;
    private readonly BankOfCanadaParser _parser;

    public BankOfCanada(HttpClient client, BankOfCanadaParser parser)
    {
        _client = client;
        _parser = parser;
    }

    public async Task<List<Currency>> GetFiatCurrencies()
    {
        const string url =
            "https://www.bankofcanada.ca/valet/observations/group/FX_RATES_DAILY/json";
        HttpResponseMessage response = await _client.GetAsync(url);
        response.EnsureSuccessStatusCode();
        string jsonContent = await response.Content.ReadAsStringAsync();

        List<Currency> currencies = _parser.ParseCurrencies(jsonContent);

        return currencies;
    }
}
