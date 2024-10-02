namespace Infrastructure.Hangfire.Interfaces;

public interface IJob
{
    Task Execute();
}
