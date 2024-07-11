using api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Core.Events;

namespace api.Services;

public class TemplateStatsService
{

    private readonly IMongoCollection<TemplateStatsOverview> _templateStatsOverviewCollection;
    private readonly IMongoCollection<TemplateStats> _templateStatsCollection;
    private readonly IMongoCollection<TemplateDayStat> _templateDayStatsCollection;
    private readonly IMongoCollection<TemplateCount> _templateCountsCollection;

    public TemplateStatsService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _templateStatsOverviewCollection = database.GetCollection<TemplateStatsOverview>(mongoDBSettings.Value.CollectionName);
        _templateStatsCollection = database.GetCollection<TemplateStats>(mongoDBSettings.Value.CollectionName);
        _templateDayStatsCollection = database.GetCollection<TemplateDayStat>(mongoDBSettings.Value.CollectionName);
        _templateCountsCollection = database.GetCollection<TemplateCount>(mongoDBSettings.Value.CollectionName);
    }

    public async Task<List<TemplateStatsOverview>> GetStatsOverviewAsync()
    {
        PipelineDefinition<TemplateStatsOverview, TemplateStatsOverview> pipeline = new[]
        {
            new BsonDocument("$group",
            new BsonDocument
                {
                    { "_id", "$template" },
                    { "count",
                        new BsonDocument("$sum", "$count") }
                }),
            new BsonDocument("$sort",
            new BsonDocument
                {
                    { "count", -1 },
                }),
            new BsonDocument("$project",
            new BsonDocument
                {
                    { "_id", 0 },
                    { "template", "$_id" },
                    { "count", 1 },
                }),
        };

        var cursor = await _templateStatsOverviewCollection.AggregateAsync(pipeline);
        var listResult = await cursor.ToListAsync();

        return listResult;
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
            // Note: CosmosDB doesn't support $lookup with pipeline, so we'll need to run a separate query below to populate previousWeek
            // new BsonDocument("$lookup",
            // new BsonDocument
            //     {
            //         { "from", "template-counts" },
            //         { "localField", "_id" },
            //         { "foreignField", "template" },
            //         { "pipeline",
            // new BsonArray
            //         {
            //             new BsonDocument("$match",
            //             new BsonDocument("date",
            //             new BsonDocument("$gte", DateTime.Now.AddDays(-7))))
            //         } },
            //         { "as", "previousWeek" }
            //     }),
            new BsonDocument("$project",
            new BsonDocument
                {
                    { "_id", 0 },
                    { "totalCount", 1 },
                    // { "previousWeek.date", 1 },
                    // { "previousWeek.count", 1 }
                }),
        };

        var cursor = await _templateStatsCollection.AggregateAsync(pipeline);
        var listResult = await cursor.ToListAsync();
        var stats = listResult.FirstOrDefault();

        if (stats == null)
        {
            return new TemplateStats();
        }

        // Previous week stats
        PipelineDefinition<TemplateDayStat, TemplateDayStat> previousWeekPipeline = new[]
        {
            new BsonDocument("$match",
            new BsonDocument
                {
                    { "template", template },
                    { "date",
                        new BsonDocument("$gte", DateTime.Now.AddDays(-7)) }
                }),
            new BsonDocument("$project",
            new BsonDocument
                {
                    { "_id", 0 },
                    { "date", 1 },
                    { "count", 1 }
                }),
        };

        var previousWeekCursor = await _templateDayStatsCollection.AggregateAsync(previousWeekPipeline);
        var previousWeekResult = await previousWeekCursor.ToListAsync();

        if (stats != null && previousWeekResult != null)
        {
            stats.PreviousWeek = previousWeekResult;
        }

        return stats;
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