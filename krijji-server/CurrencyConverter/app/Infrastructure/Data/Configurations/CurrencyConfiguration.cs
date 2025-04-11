// using Domain.Currency;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace Infrastructure.Data.Configurations;
//
// public class CurrencyConfiguration : IEntityTypeConfiguration<Currency>
// {
//     public void Configure(EntityTypeBuilder<Currency> builder)
//     {
//         builder.ToTable("currencies").HasKey(c => c.Id);
//         builder.Property(c => c.Id).HasColumnName("id").ValueGeneratedOnAdd();
//         builder.Property(c => c.Code).HasColumnName("code");
//         builder.Property(c => c.Name).HasColumnName("name");
//         // builder.HasIndex(c => c.Code).IsUnique();
//
//         builder.OwnsOne(
//             c => c.Type,
//             typeBuilder =>
//             {
//                 typeBuilder.Property(t => t.Value).HasColumnName("type");
//             }
//         );
//
//         builder.Property(c => c.RateToUsd).HasColumnName("rate_to_usd");
//         builder.Property(c => c.LastUpdated).HasColumnName("last_updated");
//     }
// }
