using Domain.Common;

namespace Domain.UpdateTimestamp;

public class UpdateTimestamp : ValueObject
{
    public static string Fiat = "Fiat";
    public static string Crypto = "Crypto";

    public string Name { get; }
    public DateTime LastUpdate { get; private set; }

    private UpdateTimestamp(string name, DateTime lastUpdate)
    {
        Name = name;
        LastUpdate = lastUpdate;
    }

    public static UpdateTimestamp CreateFiat()
    {
        return new UpdateTimestamp("Fiat", DateTime.UtcNow);
    }

    public void Update()
    {
        LastUpdate = DateTime.UtcNow;
    }

    public static UpdateTimestamp CreateCrypto()
    {
        return new UpdateTimestamp("Crypto", DateTime.UtcNow);
    }

    protected override IEnumerable<object?> GetPropertiesForComparison()
    {
        yield return Name;
        yield return LastUpdate;
    }
}
