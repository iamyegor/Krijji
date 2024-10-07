namespace Application.Queries.GetConverterData.Models;

public class FiatDto
{
    public string Code { get; set; }
    public string Name { get; set; }
    public decimal RateToUsd { get; set; }
}