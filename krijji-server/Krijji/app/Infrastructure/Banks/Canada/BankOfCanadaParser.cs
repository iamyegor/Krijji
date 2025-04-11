// using System.Text.Json;
// using Domain.Currency;
// using Domain.Currency.ValueObjects;
// using Domain.Fiat;
//
// namespace Infrastructure.Banks.Canada;
//
// public class BankOfCanadaParser
// {
//     public List<Currency> ParseCurrencies(string jsonContent)
//     {
//         using JsonDocument document = JsonDocument.Parse(jsonContent);
//         JsonElement root = document.RootElement;
//
//         JsonElement latestObservation = GetLatestObservation(root);
//         decimal fxUsdCadRate = GetFxUsdCadRate(latestObservation);
//         List<Currency> currencies = ExtractCurrencies(latestObservation, fxUsdCadRate);
//
//         return currencies;
//     }
//
//     private JsonElement GetLatestObservation(JsonElement root)
//     {
//         JsonElement observations = root.GetProperty("observations");
//         if (observations.GetArrayLength() == 0)
//         {
//             throw new Exception("No observations found.");
//         }
//
//         return observations[observations.GetArrayLength() - 1];
//     }
//
//     private decimal GetFxUsdCadRate(JsonElement latestObservation)
//     {
//         if (
//             !latestObservation.TryGetProperty("FXUSDCAD", out JsonElement fxUsdCadElement)
//             || !decimal.TryParse(fxUsdCadElement.GetProperty("v").GetString(), out decimal fxUsdCad)
//             || fxUsdCad == 0
//         )
//         {
//             throw new Exception("Unable to retrieve FXUSDCAD rate.");
//         }
//
//         return fxUsdCad;
//     }
//
//     private List<Currency> ExtractCurrencies(JsonElement latestObservation, decimal fxUsdCadRate)
//     {
//         List<Currency> currencies = [];
//
//         foreach (JsonProperty property in latestObservation.EnumerateObject())
//         {
//             if (property.Name == "d" || property.Name == "FXUSDCAD")
//             {
//                 continue;
//             }
//
//             string rateSymbol = property.Name;
//
//             if (rateSymbol.StartsWith("FX") && rateSymbol.Length == 8)
//             {
//                 string sourceCurrencyCode = rateSymbol.Substring(2, 3);
//                 string targetCurrencyCode = rateSymbol.Substring(5, 3);
//
//                 if (
//                     targetCurrencyCode == "CAD"
//                     && decimal.TryParse(
//                         property.Value.GetProperty("v").GetString(),
//                         out decimal rateInCad
//                     )
//                 )
//                 {
//                     // Calculate the rate relative to USD
//                     decimal rateInUsd = fxUsdCadRate / rateInCad;
//
//                     Fiat currencyResult = new Fiat(
//                         sourceCurrencyCode,
//                         FiatNames.GetByCode(sourceCurrencyCode),
//                         1 / rateInUsd,
//                         GetReferenceDateTime()
//                     );
//
//                     currencies.Add(currencyResult);
//                 }
//             }
//         }
//
//         return currencies;
//     }
//
//     private DateTime GetReferenceDateTime()
//     {
//         // Get the current time in Eastern Time
//         TimeZoneInfo easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
//         DateTime currentEasternTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, easternZone);
//
//         // Create a DateTime for today at 16:30 Eastern Time
//         DateTime today1630 = new DateTime(
//             currentEasternTime.Year,
//             currentEasternTime.Month,
//             currentEasternTime.Day,
//             16,
//             30,
//             0
//         );
//         today1630 = TimeZoneInfo.ConvertTimeToUtc(today1630, easternZone);
//
//         // If current time is past 16:30 ET, use today's date, otherwise use yesterday's
//         if (currentEasternTime.TimeOfDay > new TimeSpan(16, 30, 0))
//         {
//             return today1630;
//         }
//         else
//         {
//             return today1630.AddDays(-1);
//         }
//     }
// }
