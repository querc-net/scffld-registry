using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using api.Services;
using api.Models;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class TemplateStatsController : ControllerBase
{

    private readonly ILogger<TemplateStatsController> _logger;
    private readonly IMemoryCache _memoryCache;
    private readonly IConfiguration _configuration;
    private readonly TemplateStatsService _templateStatsService;

    public TemplateStatsController(ILogger<TemplateStatsController> logger, IMemoryCache memoryCache, IConfiguration configuration, TemplateStatsService templateStatsService)
    {
        _logger = logger;
        _memoryCache = memoryCache;
        _configuration = configuration;
        _templateStatsService = templateStatsService;
    }

    [HttpGet("")]
    public async Task<ActionResult<List<TemplateStatsOverview>>> GetTemplateStatsOverview()
    {
        List<TemplateStatsOverview> templateStats;
        if (!_memoryCache.TryGetValue("__stats-overview", out templateStats))
        {
            templateStats = await _templateStatsService.GetStatsOverviewAsync();

            _memoryCache.Set("__stats-overview", templateStats,
                new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(_configuration.GetValue<int?>("StatsCacheExpiration") ?? 3600)));
        }

        return Ok(templateStats);
    }

    [HttpGet("{template}")]
    public async Task<ActionResult<TemplateStats>> GetTemplateStats(string template)
    {
        TemplateStats templateCount;
        if (!_memoryCache.TryGetValue(template, out templateCount))
        {
            templateCount = await _templateStatsService.GetTotalCountAsync(template);

            _memoryCache.Set(template, templateCount,
                new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(_configuration.GetValue<int?>("StatsCacheExpiration") ?? 3600)));
        }

        return Ok(templateCount);
    }
}
