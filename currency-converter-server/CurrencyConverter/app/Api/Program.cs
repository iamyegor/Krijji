using Api;
using Application;
using Application.Jobs;
using Hangfire;
using Infrastructure.DapperConfig;
using Infrastructure.Hangfire;

DapperConfiguration.ConfigureSnakeCaseMapping(typeof(IApplication).Assembly);
WebApplication app = WebApplication.CreateBuilder(args).ConfigureServices().ConfigureMiddlewares();

using (var scope = app.Services.CreateScope())
{
    var hangfireService = scope.ServiceProvider.GetRequiredService<HangfireService>();
    hangfireService.ScheduleRecurringJob<SampleJob>("sample-job", Cron.Minutely());
}

app.Run();
