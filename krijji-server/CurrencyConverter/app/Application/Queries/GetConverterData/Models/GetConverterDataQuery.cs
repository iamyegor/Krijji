using Domain.Crypto;
using Domain.Currency.ValueObjects;
using Domain.Fiat;
using Domain.UpdateTimestamp;
using Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.GetConverterData.Models;

public record GetConverterDataQuery(string Language) : IRequest<ConverterDto>;

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
                Name = FiatNames.GetName(x.Code, query.Language),
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

        UpdateTimestamp fiatUpdate = _context.UpdateTimestamps.Single(x =>
            x.Name == UpdateTimestamp.Fiat
        );
        UpdateTimestamp cryptoUpdate = _context.UpdateTimestamps.Single(x =>
            x.Name == UpdateTimestamp.Crypto
        );

        return new ConverterDto
        {
            Fiat = fiatDtos,
            Crypto = cryptoDtos,
            CryptoLastUpdateDate = cryptoUpdate.LastUpdate,
            FiatLastUpdateDate = fiatUpdate.LastUpdate
        };
    }
}
