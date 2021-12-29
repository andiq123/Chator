namespace api.Repositories;

public class MessagesRepository : IMessagesRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public MessagesRepository(DataContext context, IMapper mapper)
    {
        _mapper = mapper;
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

    public async Task DeleteMessage(Guid id, string loggedUserId)
    {
        var msg = await GetMessage(id);
        if (msg.SenderId != loggedUserId) throw new Exception("You are not allowed to delete this message");
        _context.Messages.Remove(msg);
        await _context.SaveChangesAsync();
    }

    public async Task<Message> GetMessage(Guid id)
    {
        var msg = await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        if (msg == null) throw new Exception("Message not found");
        return msg;
    }

    public async Task<IReadOnlyList<MessageViewModel>> GetMessages(string loggedUserId, string otherUserId)
    {
        var messages = await _context.Messages.Where(m => (m.RecieverId == loggedUserId && m.SenderId == otherUserId) || (m.RecieverId == otherUserId && m.SenderId == loggedUserId)).OrderBy(x => x.Created).ToListAsync();
        if (messages == null) throw new Exception("Messages not found");
        return _mapper.Map<List<Message>, IReadOnlyList<MessageViewModel>>(messages);
    }


    public async Task<Message> UpdateMessage(Guid messageId, string loggedUserId, string text)
    {
        var message = await GetMessage(messageId);
        if (message.SenderId != loggedUserId) throw new Exception("You are not allowed to update this message");
        message.Text = text;
        await _context.SaveChangesAsync();
        return message;
    }
}
