using Api;
using Application;
using Application.Jobs;
using Infrastructure.Data.Dapper;

DapperConfiguration.ConfigureSnakeCaseMapping(typeof(IApplication).Assembly);
WebApplication app = WebApplication.CreateBuilder(args).ConfigureServices().ConfigureMiddlewares();

using (IServiceScope scope = app.Services.CreateScope())
{
    GetCryptoCurrenciesJob cryptoCurrenciesJob = new GetCryptoCurrenciesJob(scope.ServiceProvider);
    await cryptoCurrenciesJob.Execute();

    GetFiatCurrenciesJob getFiatCurrenciesJob = new GetFiatCurrenciesJob(scope.ServiceProvider);
    await getFiatCurrenciesJob.Execute();

    // HangfireService hangfireService = scope.ServiceProvider.GetRequiredService<HangfireService>();
    // hangfireService.ScheduleRecurringJob<GetFiatCurrenciesJob>("fiat-currencies", Cron.Minutely());
    // hangfireService.ScheduleRecurringJob<GetCryptoCurrenciesJob>(
    //     "crypto-currencies",
    //     Cron.Minutely()
    // );
}

app.Run();
