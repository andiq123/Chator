namespace api.Interfaces;

public interface IUsersRepository
{
    Task<IReadOnlyList<UserViewModel>> GetUsersAsync(string loggedUserId);
    Task<UserViewModel> GetUserAsync(string id);
    Task<User> GetUserRawAsync(string id);
}
