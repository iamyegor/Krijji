using System.Globalization;
using Domain.Currency.ValueObjects;
using Domain.Fiat;
using Infrastructure.Data;
using Infrastructure.Hangfire.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Serilog;

namespace Application.Jobs;

public class GetFiatCurrenciesJob : IJob
{
    private readonly ApplicationContext _context;
    private readonly HttpClient _httpClient;

    public GetFiatCurrenciesJob(IServiceProvider serviceProvider)
    {
        _httpClient = serviceProvider.GetRequiredService<HttpClient>();
        _context = serviceProvider.GetRequiredService<ApplicationContext>();
    }

    public async Task Execute()
    {
        string exchangeRatesJson = await FetchExchangeRatesAsync();
        List<Fiat> currencies = ParseExchangeRates(exchangeRatesJson);

        Dictionary<string, Fiat> existingCurrencies = await _context.Fiats.ToDictionaryAsync(
            c => c.Code,
            c => c
        );

        List<CurrencyName> names = FiatNames.GetByCode("USD");
        Fiat usd = new Fiat("USD", names, 1, DateTime.UtcNow);
        currencies.Add(usd);

        foreach (Fiat currency in currencies)
        {
            if (existingCurrencies.TryGetValue(currency.Code, out Fiat? existingCurrency))
                existingCurrency.UpdateRate(currency.RateToUsd);
            else
                _context.Fiats.Add(currency);
        }

        await _context.SaveChangesAsync();

        Log.Information($"Fetched and updated {currencies.Count} fiat currencies");
    }

    private async Task<string> FetchExchangeRatesAsync()
    {
        HttpResponseMessage response = await _httpClient.GetAsync(
            "https://www.floatrates.com/daily/usd.json"
        );
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }

    private List<Fiat> ParseExchangeRates(string json)
    {
        List<Fiat> currencies = [];

        Dictionary<string, ExchangeRate>? exchangeRatesDict = JsonConvert.DeserializeObject<
            Dictionary<string, ExchangeRate>
        >(json);

        if (exchangeRatesDict == null)
            return currencies;

        foreach (ExchangeRate exchangeRate in exchangeRatesDict.Values)
        {
            string code = exchangeRate.Code;
            decimal rateToUsd = (decimal)exchangeRate.InverseRate;

            if (
                !DateTime.TryParseExact(
                    exchangeRate.Date,
                    "ddd, d MMM yyyy HH:mm:ss 'GMT'",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.AdjustToUniversal | DateTimeStyles.AssumeUniversal,
                    out DateTime date
                )
            )
            {
                date = DateTime.UtcNow;
            }

            List<CurrencyName> names = FiatNames.GetByCode(code);

            Fiat currency = new Fiat(code, names, rateToUsd, date);

            currencies.Add(currency);
        }

        return currencies;
    }

    private class ExchangeRate
    {
        [JsonProperty("code")]
        public string Code { get; set; } = null!;

        [JsonProperty("alphaCode")]
        public string AlphaCode { get; set; } = null!;

        [JsonProperty("numericCode")]
        public string NumericCode { get; set; } = null!;

        [JsonProperty("name")]
        public string Name { get; set; } = null!;

        [JsonProperty("rate")]
        public double Rate { get; set; }

        [JsonProperty("date")]
        public string Date { get; set; } = null!;

        [JsonProperty("inverseRate")]
        public double InverseRate { get; set; }
    }
}
