using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

ApplicationContext dbContext = new();
dbContext.Database.Migrate();

Console.WriteLine("Database is migrated");
