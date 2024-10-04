using Domain.Fiat;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class FiatsConfiguration : IEntityTypeConfiguration<Fiat>
{
    public void Configure(EntityTypeBuilder<Fiat> builder)
    {
        builder.ToTable("fiats").HasKey(c => c.Id);
        builder.Property(c => c.Id).HasColumnName("id").ValueGeneratedOnAdd();
        builder.Property(c => c.Code).HasColumnName("code");
        builder.Property(c => c.Names).HasColumnName("name");
        builder.HasIndex(c => c.Code).IsUnique();

        builder.Property(c => c.RateToUsd).HasColumnName("rate_to_usd");
        builder.Property(c => c.LastUpdated).HasColumnName("last_updated");
    }
}
