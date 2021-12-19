
namespace api.Helpers;

public static class ImageHelper
{
    private static string basePath = "wwwroot/";
    private static string path = "images/";

    private static string GetImagePath(string imageName) => path + imageName;

    private static string GetFullImagePath(string imageName) => basePath + path + imageName;


    //create a image from IFormFile
    public static string CreateImage(IFormFile file)
    {
        string imageName = Guid.NewGuid().ToString() + ".jpg";
        string path = GetFullImagePath(imageName);
        using (var stream = new FileStream(path, FileMode.Create))
        {
            file.CopyTo(stream);
        }
        return imageName;
    }

    //remove a image 
    public static void RemoveImage(string imageName)
    {
        string path = GetFullImagePath(imageName);
        if (System.IO.File.Exists(path))
        {
            System.IO.File.Delete(path);
        }
    }
}
