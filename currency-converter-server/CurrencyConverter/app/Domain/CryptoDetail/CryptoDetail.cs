using Domain.Common;

namespace Domain.CryptoDetail;

public class CryptoDetail : Entity<int>
{
    public string Name { get; }
    public string Code { get; }

    protected CryptoDetail()
        : base(0) { }

    public CryptoDetail(string name, string code)
        : base(0)
    {
        Name = name;
        Code = code;
    }
}
