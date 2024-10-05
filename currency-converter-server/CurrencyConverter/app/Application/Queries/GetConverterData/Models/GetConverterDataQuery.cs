using Domain.Crypto;
using Domain.Fiat;
using Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.GetConverterData.Models;

public class GetConverterDataQuery : IRequest<ConverterDto>;

public class GetConverterDataQueryHandler : IRequestHandler<GetConverterDataQuery, ConverterDto>
{
    private readonly ApplicationContext _context;

    public GetConverterDataQueryHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<ConverterDto> Handle(GetConverterDataQuery query, CancellationToken ct)
    {
        List<Fiat> fiats = await _context.Fiats.ToListAsync(ct);
        List<Crypto> cryptos = await _context.Cryptos.ToListAsync(ct);

        List<FiatDto> fiatDtos = fiats
            .Select(x => new FiatDto
            {
                Code = x.Code,
                Name = x.Names.Single(n => n.Language == "English").Value,
                RateToUsd = x.RateToUsd
            })
            .ToList();

        List<CryptoDto> cryptoDtos = cryptos
            .Select(x => new CryptoDto
            {
                Code = x.Code,
                Name = x.Name,
                RateToUsd = x.RateToUsd
            })
            .ToList();

        return new ConverterDto
        {
            Fiat = fiatDtos,
            Crypto = cryptoDtos,
            CryptoLastUpdateDate = DateTime.UtcNow,
            FiatLastUpdateDate = DateTime.UtcNow
        };
    }
}
