using Domain.Common;

namespace Domain.Currency.ValueObjects;

public class CurrencyType : ValueObject
{
    public static CurrencyType Fiat => new("Fiat");
    public static CurrencyType Crypto => new("Crypto");
    public string Value { get; }

    private CurrencyType(string value)
    {
        Value = value;
    }

    protected override IEnumerable<object?> GetPropertiesForComparison()
    {
        yield return Value;
    }
}
