namespace api.Interfaces;
public interface IUnitOfWork
{
    IAuthRepository Auth { get; }
    IUsersRepository Users { get; }
    IMessagesRepository Messages { get; }

    Task SaveChangesAsync();
}
