using Domain.Common;

namespace Domain.CryptoName;

public class CryptoDetail : Entity<int>
{
    public string Image { get; }
    public string Name { get; }
    public string Code { get; }

    protected CryptoDetail()
        : base(0) { }

    public CryptoDetail(string name, string code, string image)
        : base(0)
    {
        Name = name;
        Code = code;
        Image = image;
    }
}
