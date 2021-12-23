namespace api.Hubs;

public class ChatHub : Hub
{
    public async Task GetConnectionId()
    {
        await Clients.Caller.SendAsync("ReceiveConnectionId", Context.ConnectionId);
    }

    public async Task SetOnlineForOthers(string userId, string connectionId)
    {
        await Clients.Others.SendAsync("SetOnline", userId, connectionId);
    }
}
