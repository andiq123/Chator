namespace api.Hubs;

public class ChatHub : Hub
{

    // ovveride on connected
    public async Task AddMyselfOnline(string userId)
    {
        var connectionId = Context.ConnectionId;
        // add user to list
        Presence.AddUser(userId, connectionId);

        // send to all users
        await Clients.Others.SendAsync("UserConnected", userId, connectionId);
    }




    public override async Task OnDisconnectedAsync(Exception? ex)
    {
        var connectionId = Context.ConnectionId;
        // remove user from list
        Presence.RemoveUser(connectionId);

        // send to all users
        await Clients.Others.SendAsync("UserDisconnected", connectionId);
    }



    public async Task GetAllUsersOnline()
    {
        var users = Presence.GetConnectedUsers();
        await Clients.Caller.SendAsync("GetAllUsersOnline", users);
    }

}
