namespace api.Interfaces;

public interface IMessagesRepository
{
    Task<Message> AddMessage(MessageToAddDto message, string userId);
    Task<IReadOnlyList<Message>> GetMessages();
    Task<Message> GetMessage(Guid id);
    Task<Message> UpdateMessage(string message);
    Task DeleteMessage(Guid id);
}
