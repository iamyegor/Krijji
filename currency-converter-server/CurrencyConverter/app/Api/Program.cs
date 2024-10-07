using Api;
using Application;
using Application.Jobs;
using Hangfire;
using Infrastructure.Data;
using Infrastructure.Data.Dapper;
using Infrastructure.Hangfire;
using Microsoft.EntityFrameworkCore;

DapperConfiguration.ConfigureSnakeCaseMapping(typeof(IApplication).Assembly);
WebApplication app = WebApplication.CreateBuilder(args).ConfigureServices().ConfigureMiddlewares();

using (IServiceScope scope = app.Services.CreateScope())
{
    ApplicationContext context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
    if (await context.Fiats.CountAsync() == 0)
    {
        GetFiatCurrenciesJob getFiatCurrenciesJob = new GetFiatCurrenciesJob(scope.ServiceProvider);
        await getFiatCurrenciesJob.Execute();
    }

    HangfireService hangfireService = scope.ServiceProvider.GetRequiredService<HangfireService>();
    hangfireService.ScheduleRecurringJob<GetFiatCurrenciesJob>("fiat-currencies", "5 0,12 * * *");
    hangfireService.ScheduleRecurringJob<GetCryptoCurrenciesJob>(
        "crypto-currencies",
        Cron.Minutely()
    );
}

app.Run();
