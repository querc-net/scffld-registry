using api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Core.Events;

namespace api.Services;

public class MongoDBService
{

    private readonly IMongoCollection<TemplateStats> _templateStatsCollection;
    private readonly IMongoCollection<TemplateCount> _templateCountsCollection;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        // var mongoConnectionUrl = new MongoUrl(mongoDBSettings.Value.ConnectionURI);
        // var mongoClientSettings = MongoClientSettings.FromUrl(mongoConnectionUrl);
        // mongoClientSettings.ClusterConfigurator = cb =>
        // {
        //     cb.Subscribe<CommandStartedEvent>(e =>
        //     {
        //         // logger.LogInformation($"{e.CommandName} - {e.Command.ToJson()}");
        //         Console.WriteLine($"{e.CommandName} - {e.Command.ToJson()}");
        //     });
        // };
        // var client = new MongoClient(mongoClientSettings);

        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _templateStatsCollection = database.GetCollection<TemplateStats>(mongoDBSettings.Value.CollectionName);
        _templateCountsCollection = database.GetCollection<TemplateCount>(mongoDBSettings.Value.CollectionName);
    }

    public async Task<TemplateStats> GetTotalCountAsync(string template)
    {
        PipelineDefinition<TemplateStats, TemplateStats> pipeline = new[]
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
            new BsonDocument("$lookup",
            new BsonDocument
                {
                    { "from", "template-counts" },
                    { "localField", "_id" },
                    { "foreignField", "template" },
                    { "pipeline",
            new BsonArray
                    {
                        new BsonDocument("$match",
                        new BsonDocument("date",
                        new BsonDocument("$gte", DateTime.Now.AddDays(-7))))
                    } },
                    { "as", "previousWeek" }
                }),
            new BsonDocument("$project",
            new BsonDocument
                {
                    { "_id", 0 },
                    { "totalCount", 1 },
                    { "previousWeek.date", 1 },
                    { "previousWeek.count", 1 }
                }),
        };

        var cursor = await _templateStatsCollection.AggregateAsync(pipeline);
        var listResult = await cursor.ToListAsync();

        return listResult.FirstOrDefault();
    }

    public async Task IncrementCountAsync(string template)
    {
        var today = DateTime.Now.ToUniversalTime().Date;

        var builder = Builders<TemplateCount>.Filter;
        var filter = builder.Eq("template", template) & builder.Eq("date", today);

        UpdateDefinition<TemplateCount> update = Builders<TemplateCount>.Update
            .Set(p => p.Template, template)
            .Set(p => p.Date, today.Date)
            .Inc(p => p.Count, 1);

        await _templateCountsCollection.UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = true });
    }

}