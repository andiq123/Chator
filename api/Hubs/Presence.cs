namespace api.Hubs;

public static class Presence
{
    private static IList<ConnectedUser> connectedUsers = new List<ConnectedUser>();

    public static void AddUser(string userId, string connectionId)
    {
        if (connectedUsers?.Any(x => x.UserId == userId) == null)
        {
            connectedUsers?.Add(new ConnectedUser { UserId = userId, ConnectionId = connectionId });
        }
    }

    public static void RemoveUser(string connectionId)
    {
        var user = connectedUsers?.FirstOrDefault(x => x.ConnectionId == connectionId);
        if (user != null)
        {
            connectedUsers?.Remove(user);
        }
    }

    public static IList<ConnectedUser> GetConnectedUsers()
    {
        return connectedUsers;
    }

    public static ConnectedUser? GetConnectedUser(string userId)
    {
        return connectedUsers?.FirstOrDefault(x => x.UserId == userId);
    }

}
