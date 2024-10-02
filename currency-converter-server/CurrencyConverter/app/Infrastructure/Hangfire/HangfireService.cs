using Hangfire;
using Infrastructure.Hangfire.Interfaces;

namespace Infrastructure.Hangfire;

public class HangfireService
{
    public void ScheduleRecurringJob<T>(string jobId, string cronExpression)
        where T : IJob
    {
        RecurringJob.AddOrUpdate<T>(jobId, job => job.Execute(), cronExpression);
    }
}
