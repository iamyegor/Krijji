using System.Globalization;
using System.Net.Http.Headers;
using Domain.Currency;
using Domain.Currency.ValueObjects;
using Domain.Fiat;
using Newtonsoft.Json;
using Serilog;

namespace Infrastructure.Banks.Malaysia;

public class BankOfMalaysia
{
    private readonly HttpClient _httpClient;

    public BankOfMalaysia(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Currency>> GetFiatCurrencies()
    {
        ExchangeRatesResponse? exchangeRates = await FetchExchangeRatesAsync();
        if (exchangeRates == null)
        {
            Log.Error("Failed to fetch malasyian bank exchange rates.");
            return [];
        }

        RateData? usdRateData = exchangeRates.Data.FirstOrDefault(r => r.CurrencyCode == "USD");
        if (usdRateData == null)
        {
            throw new Exception("USD rate not found in exchange rates data.");
        }

        decimal usdBuyingRatePerUnit = usdRateData.Rate.BuyingRate!.Value / usdRateData.Unit;

        List<Currency> currencies = [];

        foreach (RateData rateData in exchangeRates.Data)
        {
            if (rateData.Rate.BuyingRate == null || rateData.Rate.SellingRate == null)
                continue;

            decimal buyingRatePerUnit = rateData.Rate.BuyingRate.Value / rateData.Unit;
            decimal rateToUsd = buyingRatePerUnit / usdBuyingRatePerUnit;

            string code = rateData.CurrencyCode;
            DateTime date = DateTime.ParseExact(
                rateData.Rate.Date,
                "yyyy-MM-dd",
                CultureInfo.InvariantCulture
            );
            List<CurrencyName> name = FiatNames.GetByCode(code);

            Fiat currency = new Fiat(code, name, rateToUsd, date);

            currencies.Add(currency);
        }

        return currencies;
    }

    private async Task<ExchangeRatesResponse?> FetchExchangeRatesAsync()
    {
        HttpRequestMessage request = new HttpRequestMessage(
            HttpMethod.Get,
            "https://api.bnm.gov.my/public/exchange-rate"
        );
        request.Headers.Accept.Clear();
        request.Headers.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/vnd.BNM.API.v1+json")
        );

        HttpResponseMessage response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        string jsonString = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<ExchangeRatesResponse>(jsonString);
    }

    // private DateTime ConvertToMalaysiaTimeZone(DateTime date)
    // {
    //     TimeZoneInfo malaysiaTimeZone = TimeZoneInfo.CreateCustomTimeZone(
    //         "GMT+08:00",
    //         TimeSpan.FromHours(8),
    //         "GMT+08:00",
    //         "GMT+08:00"
    //     );
    //
    //     return TimeZoneInfo.ConvertTimeFromUtc(date, malaysiaTimeZone);
    // }

    private class ExchangeRatesResponse
    {
        [JsonProperty("data")]
        public List<RateData> Data { get; set; }
    }

    private class RateData
    {
        [JsonProperty("currency_code")]
        public string CurrencyCode { get; set; }

        [JsonProperty("unit")]
        public int Unit { get; set; }

        [JsonProperty("rate")]
        public Rate Rate { get; set; }
    }

    private class Rate
    {
        [JsonProperty("date")]
        public string Date { get; set; }

        [JsonProperty("buying_rate")]
        public decimal? BuyingRate { get; set; }

        [JsonProperty("selling_rate")]
        public decimal? SellingRate { get; set; }

        [JsonProperty("middle_rate")]
        public decimal MiddleRate { get; set; }
    }
}
