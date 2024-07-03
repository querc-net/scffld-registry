using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace api.Models;

public class TemplateCount
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("template")]
    [JsonPropertyName("template")]
    public string? Template { get; set; }

    [BsonElement("date")]
    [JsonPropertyName("date")]
    public DateTime? Date { get; set; }

    [BsonElement("count")]
    [JsonPropertyName("count")]
    public Int64? Count { get; set; }
}