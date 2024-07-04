using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using api.Services;
using api.Models;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class TemplatesController : ControllerBase
{

    private readonly ILogger<TemplatesController> _logger;
    private readonly HttpClient _client;
    private readonly IMemoryCache _memoryCache;
    private readonly IConfiguration _configuration;
    private readonly MongoDBService _mongoDBService;


    public TemplatesController(ILogger<TemplatesController> logger, IMemoryCache memoryCache, IConfiguration configuration, MongoDBService mongoDBService)
    {
        _logger = logger;
        _memoryCache = memoryCache;
        _configuration = configuration;
        _mongoDBService = mongoDBService;

        _client = new HttpClient();
    }


    [HttpGet("{template}")]
    public async Task<ActionResult<TemplateStats>> GetTemplateStats(string template)
    {
        TemplateStats templateCount;
        if (!_memoryCache.TryGetValue(template, out templateCount))
        {
            templateCount = await _mongoDBService.GetTotalCountAsync(template);

            _memoryCache.Set(template, templateCount,
                new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(_configuration.GetValue<int?>("StatsCacheExpiration") ?? 3600)));
        }

        return Ok(templateCount);
    }

    [HttpGet(Name = "GetTemplate")]
    public async Task<ActionResult<string>> Get(string name, string? revision = "HEAD")
    {
        var tasks = new[]
        {
            Task.Run(() => _mongoDBService.IncrementCountAsync(name))
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
