namespace api.Repositories;

public class MessagesRepository : IMessagesRepository
{
    private readonly DataContext _context;
    public MessagesRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Message> AddMessage(MessageToAddDto message, string loggedUserId)
    {
        var msg = new Message
        {
            Created = DateTime.Now,
            Text = message.Text,
            RecieverId = message.RecieverId,
            SenderId = loggedUserId,
        };
        await _context.Messages.AddAsync(msg);
        if (await _context.SaveChangesAsync() == 0) throw new Exception("Message not added");
        return msg;
    }

    public Task DeleteMessage(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<Message> GetMessage(Guid id)
    {
        var msg = await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        if (msg == null) throw new Exception("Message not found");
        return msg;
    }

    public async Task<IReadOnlyList<Message>> GetMessages()
    {
        var messages = await _context.Messages.ToListAsync();
        return messages;
    }

    public Task<Message> UpdateMessage(string message)
    {
        throw new NotImplementedException();
    }
}
