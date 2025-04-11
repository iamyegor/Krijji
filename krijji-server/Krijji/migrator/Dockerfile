FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["migrator/Migrator/Migrator.csproj", "Migrator/"]
RUN dotnet restore Migrator/Migrator.csproj

COPY ["migrator/Migrator/", "Migrator/"]
COPY ["app/Infrastructure/Data/Migrations/", "Migrator/Migrations/"]

WORKDIR /src/Migrator
RUN dotnet publish Migrator.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/runtime:9.0
WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Migrator.dll"]