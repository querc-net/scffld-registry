using api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace api.Services;

public class MongoDBService
{

    private readonly IMongoCollection<TemplateCount> _templateCountsCollection;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _templateCountsCollection = database.GetCollection<TemplateCount>(mongoDBSettings.Value.CollectionName);
    }

    public async Task<TemplateCount> GetTotalCountAsync(string template)
    {
        // var filter = Builders<TemplateCount>.Filter
        //     .Eq(templateCount => templateCount.Template, template);
        // var templateCount = await _templateCountsCollection.Find(filter).FirstOrDefaultAsync();

        // var pipeline = new BsonArray
        // var pipeline = new[]
        PipelineDefinition<TemplateCount, TemplateCount> pipeline = new[]
        {
            new BsonDocument("$match",
            new BsonDocument("template", template)),
            new BsonDocument("$group",
            new BsonDocument
                {
                    { "_id", "$template" },
                    { "totalCount",
                        new BsonDocument("$sum", "$count") }
                }),
            new BsonDocument("$project",
            new BsonDocument
                {
                    { "_id", 0 },
                    { "totalCount", 1 }
                })
        };

        var cursor = await _templateCountsCollection.AggregateAsync(pipeline);
        var listResult = await cursor.ToListAsync();

        return listResult.FirstOrDefault();
    }

}