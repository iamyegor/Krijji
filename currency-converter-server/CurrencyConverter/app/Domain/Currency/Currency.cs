using Domain.Common;
using Domain.Common.Preconditions;

namespace Domain.Currency;

public abstract class Currency : Entity<int>
{
    public string Code { get; }
    public decimal RateToUsd { get; private set; }
    public DateTime LastUpdated { get; private set; }

    protected Currency()
        : base(0) { }

    protected Currency(string code, decimal rateToUsd, DateTime lastUpdated)
        : base(0)
    {
        Precondition.Requires(!string.IsNullOrWhiteSpace(code));

        Code = code;
        RateToUsd = rateToUsd;
        LastUpdated = lastUpdated;
    }

    public void UpdateRate(decimal newRate)
    {
        RateToUsd = newRate;
        LastUpdated = DateTime.UtcNow;
    }
}
