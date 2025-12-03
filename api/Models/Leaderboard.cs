namespace LeaderboardFunctionApp.Models
{
    using System;

    public class Leaderboard
    {
        public Guid ID { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
