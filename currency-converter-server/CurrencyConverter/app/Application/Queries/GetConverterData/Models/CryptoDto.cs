namespace Application.Queries.GetConverterData;

public class CryptoDto
{
    public string Code { get; set; }
    public string? Name { get; set; }
    public decimal RateToUsd { get; set; }
}