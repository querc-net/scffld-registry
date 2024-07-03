using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class TemplatesController : ControllerBase
{

    private readonly ILogger<TemplatesController> _logger;
    private readonly HttpClient _client;
    private readonly IMemoryCache _memoryCache;


    public TemplatesController(ILogger<TemplatesController> logger, IMemoryCache memoryCache)
    {
        _logger = logger;
        _memoryCache = memoryCache;
        _client = new HttpClient();
    }

    [HttpGet(Name = "GetTemplate")]
    public async Task<ActionResult<string>> Get(string name, string? revision = "HEAD")
    {
        var tasks = new[]
        {
            Task.Run(() => UpdateCount(name))
        };

        var url = $"https://raw.githubusercontent.com/scffld-dev/website/{revision}/templates/{name}.md";
        // _logger.LogInformation($"Fetching {name} from {url}", DateTime.UtcNow.ToLongTimeString());

        string template;
        if (!_memoryCache.TryGetValue(url, out template))
        {
            template = await this._client.GetStringAsync(url);
            _memoryCache.Set(url, template,
                new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(15)));
        }

        return Ok(template);
    }


    // TODO: do it
    async Task UpdateCount(string name)
    {
        // _logger.LogInformation($"TODO: update count for {name}", DateTime.UtcNow.ToLongTimeString());
    }
}
