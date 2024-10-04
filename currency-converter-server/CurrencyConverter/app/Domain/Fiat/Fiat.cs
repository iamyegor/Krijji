using Domain.Common;
using Domain.Common.Preconditions;

namespace Domain.Fiat;

public class Fiat : Currency.Currency
{
    public List<CurrencyName> Names { get; }

    protected Fiat() { }

    public Fiat(string code, List<CurrencyName> names, decimal rateToUsd, DateTime lastUpdated)
        : base(code, rateToUsd, lastUpdated)
    {
        Precondition.Requires(names.Select(n => n.Language).Distinct().Count() == names.Count);
        Names = names;
    }
}

public class CurrencyName : ValueObject
{
    public string Value { get; }
    public string Language { get; }

    public CurrencyName(string value, string language)
    {
        Value = value;
        Language = language;
    }

    protected override IEnumerable<object?> GetPropertiesForComparison()
    {
        yield return Value;
        yield return Language;
    }
}
