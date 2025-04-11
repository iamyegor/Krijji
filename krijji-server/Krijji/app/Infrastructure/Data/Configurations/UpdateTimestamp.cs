using Domain.UpdateTimestamp;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configurations;

public class UpdateTimestampConfiguration : IEntityTypeConfiguration<UpdateTimestamp>
{
    public void Configure(EntityTypeBuilder<UpdateTimestamp> builder)
    {
        builder.Property<int>("id");
        builder.ToTable("update_timestamps").HasKey("id");
        
        builder.Property(c => c.Name).HasColumnName("name");
        builder.HasIndex(c => c.Name).IsUnique();
        
        builder.Property(c => c.LastUpdate).HasColumnName("last_update");
    }
}
