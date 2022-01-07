namespace api.Hubs;

public class ChatHub : Hub
{

    // ovveride on connected
    public async Task AddMyselfOnline(string userId)
    {
        var connectionId = Context.ConnectionId;
        // add user to list
        Presence.AddUser(userId, connectionId);

        // send to other users
        await Clients.Others.SendAsync("UserConnected", userId);

        var users = Presence.GetConnectedUsers();
        await Clients.Caller.SendAsync("GetAllUsersOnline", users);
    }
    public override async Task OnDisconnectedAsync(Exception? ex)
    {
        var connectionId = Context.ConnectionId;
        // remove user from list
        var userId = Presence.RemoveUser(connectionId);

        // send to other users
        await Clients.Others.SendAsync("UserDisconnected", userId);
    }


    public async Task SendMessage(MessageViewModel message)
    {
        var recieverUser = Presence.GetConnectedUser(message.RecieverId);
        if (recieverUser != null)
            await Clients.Client(recieverUser.ConnectionId).SendAsync("ReceiveMessage", message);
    }
    public async Task DeleteMessage(string userId, string messageId)
    {
        var recieverUser = Presence.GetConnectedUser(userId);
        if (recieverUser != null)
            await Clients.Client(recieverUser.ConnectionId).SendAsync("MessageDeleted", messageId);
    }
    public async Task EditMessage(string userId, string messageId, string text)
    {
        var recieverUser = Presence.GetConnectedUser(userId);
        if (recieverUser != null)
            await Clients.Client(recieverUser.ConnectionId).SendAsync("MessageEdited", messageId, text);
    }
}
