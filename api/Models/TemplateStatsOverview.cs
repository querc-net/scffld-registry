using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace api.Models;

public class TemplateStatsOverview
{

    [BsonElement("template")]
    [JsonPropertyName("template")]
    public string? Template { get; set; }

    [BsonElement("count")]
    [JsonPropertyName("count")]
    public Int64? Count { get; set; }
}