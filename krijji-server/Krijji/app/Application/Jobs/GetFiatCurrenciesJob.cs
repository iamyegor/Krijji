using Domain.Currency.ValueObjects;
using Domain.Fiat;
using Domain.UpdateTimestamp;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Quartz;
using Serilog;
using XResults;

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

    public async Task Execute(IJobExecutionContext context)
    {
        string exchangeRatesJson = await FetchExchangeRatesAsync();
        List<Fiat> currencies = ParseExchangeRates(exchangeRatesJson);

        Dictionary<string, Fiat> existingCurrencies = await _context.Fiats.ToDictionaryAsync(
            c => c.Code,
            c => c
        );

        List<CurrencyName> names = FiatNames.GetByCode("USD");
        Fiat usd = new Fiat("USD", names, 1);
        currencies.Add(usd);

        foreach (Fiat currency in currencies)
        {
            if (existingCurrencies.TryGetValue(currency.Code, out Fiat? existingCurrency))
                existingCurrency.UpdateRate(currency.RateToUsd);
            else
                _context.Fiats.Add(currency);
        }

        UpdateLastUpdatedTimestamp();

        await _context.SaveChangesAsync();

        Log.Information($"Fetched and updated {currencies.Count} fiat currencies");
    }

    private void UpdateLastUpdatedTimestamp()
    {
        UpdateTimestamp? fiatUpdateTimestamp = _context.UpdateTimestamps.SingleOrDefault(x =>
            x.Name == UpdateTimestamp.Fiat
        );
        if (fiatUpdateTimestamp != null)
        {
            fiatUpdateTimestamp.Update();
        }
        else
        {
            fiatUpdateTimestamp = UpdateTimestamp.CreateFiat();
            _context.UpdateTimestamps.Add(fiatUpdateTimestamp);
        }
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

            Result<List<CurrencyName>> currencyNamesOrFailure = FiatNames.GetByCode(code);
            if (currencyNamesOrFailure.IsFailure)
                continue;

            Fiat currency = new(code, currencyNamesOrFailure.Value, rateToUsd);

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
