using Domain.Currency;
using Domain.Currency.ValueObjects;
using Domain.Fiat;
using Serilog;

namespace Infrastructure.Banks.EuropeanUnion;

public class EcbBank
{
    private const string EcbApiUrl =
        "https://data-api.ecb.europa.eu/service/data/EXR/D..EUR.SP00.A?lastNObservations=1";

    private readonly HttpClient _client;
    private readonly EcbParser _ecbParser;

    public EcbBank(HttpClient client, EcbParser ecbParser)
    {
        _client = client;
        _ecbParser = ecbParser;
    }

    public async Task<List<Currency>> GetFiatCurrencies()
    {
        string xmlContent = await _client.GetStringAsync(EcbApiUrl);
        if (string.IsNullOrEmpty(xmlContent))
        {
            Log.Error("Failed to fetch data from ECB");
            return [];
        }

        Dictionary<string, (decimal rate, DateTime updated)> currencyRatesInEur =
            _ecbParser.ParseCurrencyRates(xmlContent);
        if (!currencyRatesInEur.Any())
        {
            Log.Error("No currency rates found in ECB data");
            return [];
        }

        if (!currencyRatesInEur.TryGetValue("USD", out (decimal rate, DateTime) usdToEur))
        {
            Log.Error("USD rate not found in ECB data");
            return [];
        }

        List<Currency> currencies = ConvertRatesToUsd(currencyRatesInEur, usdToEur.rate);

        Log.Information($"Successfully fetched {currencies.Count} currencies from ECB");

        return currencies;
    }

    private List<Currency> ConvertRatesToUsd(
        Dictionary<string, (decimal rate, DateTime updated)> ratesInEur,
        decimal usdToEurRate
    )
    {
        List<Currency> currencies = [];

        foreach ((string currencyCode, (decimal rateToEur, DateTime updated)) in ratesInEur)
        {
            if (currencyCode == "USD")
            {
                continue;
            }

            decimal rateToUsd = rateToEur / usdToEurRate;
            List<CurrencyName> currencyName = FiatNames.GetByCode(currencyCode);

            Fiat currencyResult = new Fiat(currencyCode, currencyName, rateToUsd, updated);

            currencies.Add(currencyResult);
        }

        return currencies;
    }
}
