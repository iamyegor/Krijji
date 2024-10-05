namespace Application.Queries.GetConverterData;

public class FiatDto
{
    public string Code { get; set; }
    public string Name { get; set; }
    public decimal RateToUsd { get; set; }
}