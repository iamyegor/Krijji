// using System.Text.Json;
// using Domain.Currency;
// using Domain.Currency.ValueObjects;
// using Domain.Fiat;
//
// namespace Infrastructure.Banks.Georgia;
//
// public class BankOfGeorgia
// {
//     private readonly HttpClient _httpClient;
//
//     public BankOfGeorgia(HttpClient httpClient)
//     {
//         _httpClient = httpClient;
//     }
//
//     public async Task<List<Currency>> GetFiatCurrencies()
//     {
//         string jsonContent = await FetchExchangeRates();
//         using JsonDocument doc = JsonDocument.Parse(jsonContent);
//         return ParseCurrencies(doc.RootElement);
//     }
//
//     private async Task<string> FetchExchangeRates()
//     {
//         DateTime date = DateTime.UtcNow.Date;
//         HttpResponseMessage response = await _httpClient.GetAsync(GetApiUrl(date));
//
//         if (!response.IsSuccessStatusCode)
//         {
//             date = date.AddDays(-1);
//             response = await _httpClient.GetAsync(GetApiUrl(date));
//
//             if (!response.IsSuccessStatusCode)
//             {
//                 return "[]"; // Return an empty JSON array as a string
//             }
//         }
//
//         return await response.Content.ReadAsStringAsync();
//     }
//
//     private static string GetApiUrl(DateTime date)
//     {
//         return $"https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json/?date={date:yyyy-MM-dd}";
//     }
//
//     private static List<Currency> ParseCurrencies(JsonElement root)
//     {
//         List<Currency> currencies = [];
//
//         if (root.ValueKind != JsonValueKind.Array || root.GetArrayLength() == 0)
//         {
//             return currencies;
//         }
//
//         JsonElement exchangeRateData = root[0];
//         DateTime lastUpdated = DateTime.Parse(exchangeRateData.GetProperty("date").GetString()!);
//         JsonElement.ArrayEnumerator currenciesArray = exchangeRateData
//             .GetProperty("currencies")
//             .EnumerateArray();
//
//         // Find USD rate first
//         decimal usdRate = 1;
//         foreach (JsonElement currency in currenciesArray)
//         {
//             if (currency.GetProperty("code").GetString() == "USD")
//             {
//                 usdRate =
//                     currency.GetProperty("rate").GetDecimal()
//                     / currency.GetProperty("quantity").GetDecimal();
//                 break;
//             }
//         }
//
//         foreach (JsonElement currency in currenciesArray)
//         {
//             string code = currency.GetProperty("code").GetString()!;
//             decimal rate = currency.GetProperty("rate").GetDecimal();
//             decimal quantity = currency.GetProperty("quantity").GetDecimal();
//
//             decimal rateToUsd = CalculateRateToUsd(rate, quantity, usdRate);
//
//             List<CurrencyName> name = FiatNames.GetByCode(code);
//
//             currencies.Add(new Fiat(code, name, rateToUsd, lastUpdated));
//         }
//
//         return currencies;
//     }
//
//     private static decimal CalculateRateToUsd(decimal rate, decimal quantity, decimal usdRate)
//     {
//         // Convert the rate to 1 unit of currency
//         decimal ratePerUnit = rate / quantity;
//         // Calculate how many USD 1 unit of the currency is worth
//         return ratePerUnit / usdRate;
//     }
// }
