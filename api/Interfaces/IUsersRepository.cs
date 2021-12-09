
namespace api.Interfaces
{
    public interface IUsersRepository
    {
        Task<IReadOnlyList<UserViewModel>> GetUsersAsync();
        Task<UserViewModel> GetUserAsync(string id);
    }
}