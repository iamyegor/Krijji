using Domain.Common;
using Domain.Currency.ValueObjects;
using Domain.DomainErrors;
using XResults;

namespace Domain.Currency;

public class Currency : ValueObject
{
    public string Code { get; }
    public CurrencyType Type { get; }

    protected Currency() { }

    private Currency(string code, Type type)
    {
        Code = code;
    }

    public static Result<Currency, Error> Create(string code, Type type)
    {
        if (string.IsNullOrWhiteSpace(code))
        {
            return Result.Fail(new Error("Invalid currency data"));
        }

        return Result.Ok(new Currency(code, type));
    }

    protected override IEnumerable<object?> GetPropertiesForComparison()
    {
        yield return Code;
    }
}
