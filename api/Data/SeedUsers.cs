namespace api.Data
{
    public static class SeedUsers
    {
        public static async Task Seed(UserManager<User> userManager)
        {
            var user1 = new User { Description = "This is the description of user1", UserName = "user1" };
            var user2 = new User { Description = "This is the description of user2", UserName = "user2" };

            await userManager.CreateAsync(user1, "Password1@");
            await userManager.CreateAsync(user2, "Password1@");
        }
    }
}
