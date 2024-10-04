using Hangfire;
using Hangfire.Storage.SQLite;
using Infrastructure.Banks.Bahrain;
using Infrastructure.Banks.Canada;
using Infrastructure.Banks.EuropeanUnion;
using Infrastructure.Banks.Georgia;
using Infrastructure.Banks.Malaysia;
using Infrastructure.Data;
using Infrastructure.Data.Dapper;
using Infrastructure.Hangfire;
using Infrastructure.Utils;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SQLitePCL;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration config,
        bool isDevelopment
    )
    {
        ConnectionStringResolver connectionStringResolver = new ConnectionStringResolver(config);
        string connectionString = connectionStringResolver.GetBasedOnEnvironment();

        services
            .AddScoped(_ => new ApplicationContext(connectionString, isDevelopment))
            .AddTransient<DapperConnectionFactory>()
            .AddTransient<HttpClient>()
            .AddTransient<ConnectionStringResolver>();

        Batteries.Init();
        services.AddHangfire(configuration =>
            configuration
                .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseRecommendedSerializerSettings()
                .UseSQLiteStorage("hangfire.db")
        );
        services.AddHangfireServer();

        services.AddScoped<HangfireService>();
        services.AddTransient<EcbBank>();
        services.AddTransient<BankOfCanada>();
        services.AddTransient<EcbParser>();
        services.AddTransient<BankOfCanadaParser>();
        services.AddTransient<BankOfBahrain>();
        services.AddTransient<BankOfGeorgia>();
        services.AddTransient<BankOfMalaysia>();

        return services;
    }
}
