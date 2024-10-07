using Domain.Crypto;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class CryptoConfiguration : IEntityTypeConfiguration<Domain.Crypto.Crypto>
{
    public void Configure(EntityTypeBuilder<Domain.Crypto.Crypto> builder)
    {
        builder.ToTable("cryptos").HasKey(c => c.Id);
        builder.Property(c => c.Id).HasColumnName("id").ValueGeneratedOnAdd();
        builder.Property(c => c.Code).HasColumnName("code");
        builder.Property(c => c.Name).HasColumnName("name");
        builder.HasIndex(c => c.Code).IsUnique();

        builder.Property(c => c.RateToUsd).HasColumnName("rate_to_usd");
    }
}
