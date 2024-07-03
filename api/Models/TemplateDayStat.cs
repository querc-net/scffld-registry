using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace api.Models;

public class TemplateDayStat
{
    [BsonElement("date")]
    [JsonPropertyName("date")]
    public DateTime? Date { get; set; }

    [BsonElement("count")]
    [JsonPropertyName("count")]
    public Int64? Count { get; set; }
}