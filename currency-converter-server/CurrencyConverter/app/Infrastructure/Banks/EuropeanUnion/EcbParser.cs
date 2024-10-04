using System.Xml.Linq;
using Serilog;

namespace Infrastructure.Banks.EuropeanUnion;

public class EcbParser
{
    public Dictionary<string, (decimal rate, DateTime updated)> ParseCurrencyRates(
        string xmlContent
    )
    {
        Dictionary<string, (decimal rate, DateTime updated)> currencyData = new();

        XDocument xmlDocument = XDocument.Parse(xmlContent);
        XNamespace ns = "http://www.sdmx.org/resources/sdmxml/schemas/v2_1/data/generic";

        foreach (XElement seriesElement in xmlDocument.Descendants(ns + "Series"))
        {
            string? currencyCode = ExtractCurrencyCode(seriesElement, ns);
            (decimal Rate, DateTime Updated)? data = ExtractCurrencyData(seriesElement, ns);

            if (!string.IsNullOrEmpty(currencyCode) && data.HasValue)
            {
                currencyData[currencyCode] = (1 / data.Value.Rate, data.Value.Updated);
            }
        }

        return currencyData;
    }

    private string? ExtractCurrencyCode(XElement seriesElement, XNamespace ns)
    {
        return seriesElement
            .Element(ns + "SeriesKey")
            ?.Elements(ns + "Value")
            .FirstOrDefault(v => v.Attribute("id")?.Value == "CURRENCY")
            ?.Attribute("value")
            ?.Value;
    }

    private (decimal, DateTime)? ExtractCurrencyData(XElement seriesElement, XNamespace ns)
    {
        XElement? obsElement = seriesElement.Element(ns + "Obs");
        if (obsElement == null)
        {
            Log.Warning("Obs element not found for a currency series");
            return null;
        }

        string? dateValue = obsElement.Element(ns + "ObsDimension")?.Attribute("value")?.Value;
        if (!DateTime.TryParse(dateValue, out DateTime date))
        {
            Log.Warning($"Invalid or outdated date value: {dateValue}");
            return null;
        }

        DateTime yesterday = DateTime.Today.AddDays(-1);
        if (date.Date < yesterday)
            return null;

        string? rateValue = obsElement.Element(ns + "ObsValue")?.Attribute("value")?.Value;
        if (decimal.TryParse(rateValue, out decimal rate))
        {
            return (rate, date.Date.ToUniversalTime());
        }
        else
        {
            Log.Warning($"Invalid rate value: {rateValue}");
            return null;
        }
    }
}
