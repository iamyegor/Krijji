using Api.Controllers.Common;
using Application.Queries.GetConverterData;
using Application.Queries.GetConverterData.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/converter")]
public class ConverterController : ApplicationController
{
    private readonly IMediator _mediator;

    public ConverterController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetConverterData([FromQuery] string language)
    {
        ConverterDto converterDto = await _mediator.Send(new GetConverterDataQuery(language));
        return Ok(converterDto);
    }
}
