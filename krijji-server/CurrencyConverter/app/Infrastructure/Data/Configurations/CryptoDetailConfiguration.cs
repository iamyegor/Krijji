using Domain.CryptoDetail;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class CryptoDetailConfiguration : IEntityTypeConfiguration<CryptoDetail>
{
    public void Configure(EntityTypeBuilder<CryptoDetail> builder)
    {
        builder.ToTable("crypto_details").HasKey(x => x.Id);
        builder.Property(c => c.Id).HasColumnName("id").ValueGeneratedOnAdd();

        builder.Property(x => x.Name).HasColumnName("name");
        builder.Property(x => x.Code).HasColumnName("code");
    }
}
