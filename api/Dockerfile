# Use the official image as a parent image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Restore .NET dependencies
COPY ["api/api.csproj", "api/"]
RUN dotnet restore "api/api.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/api"
RUN dotnet build "api.csproj" -c Release -o /app/build

# Publish the api project
FROM build AS publish
RUN dotnet publish "api.csproj" -c Release -o /app/publish

# Copy the build app to the base image and define entrypoint
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "api.dll"]
