using System.Globalization;
using Domain.Currency;
using Domain.Currency.ValueObjects;
using Domain.Fiat;
using Newtonsoft.Json;

namespace Infrastructure.Banks.Bahrain;

public class BankOfBahrain
{
    private readonly HttpClient _httpClient;

    public BankOfBahrain(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Currency>> GetFiatCurrencies()
    {
        HttpResponseMessage response = await _httpClient.GetAsync(
            "https://cbb.gov.bh/openapi/ExchangeRate"
        );
        response.EnsureSuccessStatusCode();
        string content = await response.Content.ReadAsStringAsync();

        ExchangeRateResponse? exchangeRates = JsonConvert.DeserializeObject<ExchangeRateResponse>(
            content
        );

        if (exchangeRates == null)
            return [];

        List<Currency> currencies = [];

        foreach (ExchangeRateItem item in exchangeRates.Items)
        {
            if (decimal.TryParse(item.UsCurr, out decimal usCurr) && usCurr != 0)
            {
                decimal rateToUsd = 1 / usCurr;
                Fiat currencyResult = new Fiat(
                    item.CurrCd,
                    FiatNames.GetByCode(item.CurrCd),
                    rateToUsd,
                    DateTime.ParseExact("03-OCT-2024", "dd-MMM-yyyy", CultureInfo.InvariantCulture)
                );

                currencies.Add(currencyResult);
            }
        }

        return currencies;
    }

    private class ExchangeRateResponse
    {
        [JsonProperty("items")]
        public List<ExchangeRateItem> Items { get; set; }
    }

    private class ExchangeRateItem
    {
        [JsonProperty("RateDt")]
        public string RateDt { get; set; }

        [JsonProperty("CurrCd")]
        public string CurrCd { get; set; }

        [JsonProperty("UsCurr")]
        public string UsCurr { get; set; }

        [JsonProperty("BdCurr")]
        public string BdCurr { get; set; }

        [JsonProperty("ThreeMth")]
        public string ThreeMth { get; set; }

        [JsonProperty("SixMth")]
        public string SixMth { get; set; }

        [JsonProperty("HomepageFlg")]
        public string HomepageFlg { get; set; }

        [JsonProperty("Region")]
        public string Region { get; set; }
    }
}
