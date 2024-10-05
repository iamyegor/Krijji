using Domain.Fiat;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class FiatConfiguration : IEntityTypeConfiguration<Fiat>
{
    public void Configure(EntityTypeBuilder<Fiat> builder)
    {
        builder.ToTable("fiats").HasKey(c => c.Id);
        builder.Property(c => c.Id).HasColumnName("id").ValueGeneratedOnAdd();
        builder.Property(c => c.Code).HasColumnName("code");
        builder.OwnsMany(
            c => c.Names,
            nBuilder =>
            {
                nBuilder.Property<int>("id");
                nBuilder.ToTable("fiat_names").HasKey("id");
                nBuilder.Property(n => n.Value).HasColumnName("name");
                nBuilder.Property(n => n.Language).HasColumnName("language");
                nBuilder.WithOwner().HasForeignKey("fiat_id");
            }
        );

        builder.HasIndex(c => c.Code).IsUnique();

        builder.Property(c => c.RateToUsd).HasColumnName("rate_to_usd");
        builder.Property(c => c.LastUpdated).HasColumnName("last_updated");
    }
}
