using Application.Queries.GetConverterData.Models;

namespace Application.Queries.GetConverterData;

public class ConverterDto
{
    public List<FiatDto> Fiat { get; set; }
    public List<CryptoDto> Crypto { get; set; }
    public DateTime CryptoLastUpdateDate { get; set; }
    public DateTime FiatLastUpdateDate { get; set; }
}
