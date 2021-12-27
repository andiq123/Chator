namespace api.Hubs;

public class ChatHub : Hub
{

    // ovveride on connected
    public async Task AddMyselfOnline(string userId)
    {
        var connectionId = Context.ConnectionId;
        // add user to list
        Presence.AddUser(userId, connectionId);
        System.Console.WriteLine("Connected: " + Presence.GetConnectedUsers().Count());
        // send to other users
        await Clients.Others.SendAsync("UserConnected", userId);
    }

    public override async Task OnDisconnectedAsync(Exception? ex)
    {
        var connectionId = Context.ConnectionId;
        // remove user from list
        var userId = Presence.RemoveUser(connectionId);
        System.Console.WriteLine("Disconected: " + Presence.GetConnectedUsers().Count());
        // send to other users
        await Clients.Others.SendAsync("UserDisconnected", userId);
    }

    public async Task GetAllUsersOnline()
    {
        var users = Presence.GetConnectedUsers();
        await Clients.Caller.SendAsync("GetAllUsersOnline", users);
    }

}
