namespace LeaderboardFunctionApp
{
    using LeaderboardFunctionApp.Models;
    using Microsoft.EntityFrameworkCore;

    public class LeaderboardDbContext(DbContextOptions<LeaderboardDbContext> options) : DbContext(options)
    {
        public DbSet<Leaderboard> Leaderboards { get; set; }
    }
}
