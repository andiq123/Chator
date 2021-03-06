namespace api.Interfaces;

public interface IMessagesRepository
{
    Task<Message> AddMessage(MessageToAddDto message, string userId);
    Task<IReadOnlyList<MessageViewModel>> GetMessages(string loggedUserId, string otherUserId);
    Task<Message> GetMessage(Guid id);
    Task<Message> UpdateMessage(Guid messageId, string loggedUserId, string text);
    Task DeleteMessage(Guid id, string loggedUserId);
}
