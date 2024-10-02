using Infrastructure.Hangfire.Interfaces;

namespace Application.Jobs;

public class SampleJob : IJob
{
    public async Task Execute()
    {
        Console.WriteLine("Sample job executed");
    }
}