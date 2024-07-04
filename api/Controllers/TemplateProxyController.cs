using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using api.Services;
using api.Models;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class TemplateProxyController : ControllerBase
{

    private readonly ILogger<TemplateProxyController> _logger;
    private readonly HttpClient _client;
    private readonly IMemoryCache _memoryCache;
    private readonly IConfiguration _configuration;
    private readonly TemplateStatsService _templateStatsService;


    public TemplateProxyController(ILogger<TemplateProxyController> logger, IMemoryCache memoryCache, IConfiguration configuration, TemplateStatsService templateStatsService)
    {
        _logger = logger;
        _memoryCache = memoryCache;
        _configuration = configuration;
        _templateStatsService = templateStatsService;

        _client = new HttpClient();
    }

    [HttpGet("{name}")]
    [HttpGet("{name}/{revision?}")]
    public async Task<ActionResult<string>> Get(string name, string? revision = "HEAD")
    {
        var tasks = new[]
        {
            Task.Run(() => _templateStatsService.IncrementCountAsync(name))
        };

        var url = $"https://raw.githubusercontent.com/scffld-dev/website/{revision}/templates/{name}.md";
        // _logger.LogInformation($"Fetching {name} from {url}", DateTime.UtcNow.ToLongTimeString());

        string template;
        if (!_memoryCache.TryGetValue(url, out template))
        {
            template = await _client.GetStringAsync(url);
            _memoryCache.Set(url, template,
                new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(_configuration.GetValue<int?>("TemplateCacheExpiration") ?? 3600)));
        }

        return Ok(template);
    }
}
