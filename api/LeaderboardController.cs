using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace LeaderboardFunctionApp;

public class LeaderboardController
{
    private readonly ILogger<LeaderboardController> _logger;
    private readonly LeaderboardDbContext _dbContext;

    public LeaderboardController(ILogger<LeaderboardController> logger, LeaderboardDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    [Function("LeaderboardController")]
    public IActionResult Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
    {
        _dbContext.Leaderboards.Add(new Models.Leaderboard
        {
            ID = Guid.NewGuid(),
            Name = "Sample Leaderboard",
            Description = "This is a sample leaderboard entry.",
            CreatedAt = DateTime.UtcNow
        });
        _dbContext.SaveChanges();
        return new OkObjectResult("Welcome to Azure Functions!");
    }
}