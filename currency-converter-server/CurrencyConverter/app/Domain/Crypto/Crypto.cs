namespace Domain.Crypto;

public class Crypto : Currency.Currency
{
    public string? Name { get; }

    protected Crypto() { }

    public Crypto(string code, string? name, decimal rateToUsd, DateTime lastUpdated)
        : base(code, rateToUsd, lastUpdated)
    {
        Name = name;
    }
}
