namespace api.Hubs;

public static class Presence
{
    private static IList<ConnectedUser> connectedUsers = new List<ConnectedUser>();

    public static void AddUser(string userId, string connectionId)
    {
        if (!connectedUsers.Any(x => x.UserId == userId))
        {
            connectedUsers.Add(new ConnectedUser { UserId = userId, ConnectionId = connectionId });
        }
    }

    public static string RemoveUser(string connectionId)
    {
        var user = connectedUsers.FirstOrDefault(x => x.ConnectionId == connectionId);
        if (user == null) return null;
        var userId = user.UserId;
        connectedUsers.Remove(user);
        return userId;
    }

    public static IList<ConnectedUser> GetConnectedUsers()
    {
        return connectedUsers;
    }

    public static ConnectedUser GetConnectedUser(string userId)
    {
        return connectedUsers.FirstOrDefault(x => x.UserId == userId);
    }

}
