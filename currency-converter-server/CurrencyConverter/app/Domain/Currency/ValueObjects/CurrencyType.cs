using Domain.Common;

namespace Domain.Currency.ValueObjects;

public class CurrencyType : ValueObject
{
    public static CurrencyType Fiat => new("Fiat");
    public static CurrencyType Crypto => new("Crypto");
    public string Type { get; }

    private CurrencyType(string type)
    {
        Type = type;
    }

    protected override IEnumerable<object?> GetPropertiesForComparison()
    {
        yield return Type;
    }
}
