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

    public async Task<IReadOnlyList<MessageViewModel>> GetMessages(string loggedUserId, string otherUserId)
    {
        var messages = await _context.Messages.Where(m => (m.RecieverId == loggedUserId && m.SenderId == otherUserId) || (m.RecieverId == otherUserId && m.SenderId == loggedUserId)).ToListAsync();
        if (messages == null) throw new Exception("Messages not found");
        return _mapper.Map<List<Message>, IReadOnlyList<MessageViewModel>>(messages);
    }


    public Task<Message> UpdateMessage(string message)
    {
        throw new NotImplementedException();
    }
}
