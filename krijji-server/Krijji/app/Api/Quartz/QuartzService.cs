using Application.Jobs;
using Quartz;

namespace Api.Quartz;

public static class QuartzService
{
    public static IServiceCollection AddQuartzService(this IServiceCollection services)
    {
        services.AddQuartz(q =>
        {
            q.AddJob<GetFiatCurrenciesJob>(opts => opts.WithIdentity("fiat"));

            q.AddTrigger(opts =>
                opts.ForJob("fiat").WithIdentity("fiat-trigger-immediate").StartNow()
            );

            q.AddTrigger(opts =>
                opts.ForJob("fiat")
                    .WithIdentity("fiat-trigger-scheduled")
                    .WithCronSchedule("0 5 0,12 ? * *")
            );

            q.AddJob<GetCryptoCurrenciesJob>(opts => opts.WithIdentity("crypto"));
            q.AddTrigger(opts =>
                opts.ForJob("crypto").WithIdentity("crypto-trigger").WithCronSchedule("0 * * * * ?")
            );
        });

        services.AddQuartzHostedService(options =>
        {
            options.WaitForJobsToComplete = true;
        });

        return services;
    }
}
