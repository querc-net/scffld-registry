using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace api.Models;

public class TemplateStats
{
    [BsonElement("totalCount")]
    [JsonPropertyName("totalCount")]
    public Int64? TotalCount { get; set; }

    [BsonElement("previousWeek")]
    [JsonPropertyName("previousWeek")]
    public List<TemplateDayStat> PreviousWeek { get; set; } = null!;
}