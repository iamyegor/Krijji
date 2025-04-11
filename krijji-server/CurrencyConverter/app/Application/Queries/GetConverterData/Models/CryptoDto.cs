namespace Application.Queries.GetConverterData.Models;

public class CryptoDto
{
    public string Code { get; set; }
    public string? Name { get; set; }
    public decimal RateToUsd { get; set; }
}