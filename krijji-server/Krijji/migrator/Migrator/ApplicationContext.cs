using Microsoft.EntityFrameworkCore;

// ReSharper disable once CheckNamespace
namespace Infrastructure.Data;

public class ApplicationContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string? connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
        optionsBuilder.UseNpgsql(connectionString);
    }
}