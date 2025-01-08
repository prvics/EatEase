using EatEase.Models;
using Microsoft.AspNetCore.Identity;

namespace EatEase.Data;

public static class DbInitializer
{
    public static async Task SeedAdminUser(IServiceProvider serviceProvider)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        
        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new IdentityRole("Admin"));
        }
        
        if (!await roleManager.RoleExistsAsync("User"))
        {
            await roleManager.CreateAsync(new IdentityRole("User"));
        }
        
        if (!await roleManager.RoleExistsAsync("VIP"))
        {
            await roleManager.CreateAsync(new IdentityRole("VIP"));
        }
        
        var adminEmail = "admin@eatease.com";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);
        if (adminUser == null)
        {
            var user = new IdentityUser
            {
                UserName = "admin",
                Email = adminEmail,
                EmailConfirmed = true
            };
            await userManager.CreateAsync(user, "Admin123!");
            await userManager.AddToRoleAsync(user, "Admin");
        }
    }
    public static async Task SeedMealsAndIngredients(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<AppDbContext>();

        if (!context.Meals.Any())
        {
            var meals = new List<Meal>
            {
                new Meal
                {
                    Name = "Breakfast Oatmeal",
                    Category = "Breakfast",
                    Instructions = "Cook oats with water or milk, and add fruits and nuts.",
                    Ingredients = new List<Ingredient>
                    {
                        new Ingredient { Name = "Oats", Quantity = 1, Unit = "cup" },
                        new Ingredient { Name = "Almonds", Quantity = 0.5, Unit = "cup" },
                        new Ingredient { Name = "Blueberries", Quantity = 0.5, Unit = "cup" }
                    }
                },
                new Meal
                {
                    Name = "Grilled Chicken Salad",
                    Category = "Lunch",
                    Instructions = "Grill chicken and mix with fresh vegetables.",
                    Ingredients = new List<Ingredient>
                    {
                        new Ingredient { Name = "Chicken Breast", Quantity = 1, Unit = "piece" },
                        new Ingredient { Name = "Lettuce", Quantity = 1, Unit = "cup" },
                        new Ingredient { Name = "Tomato", Quantity = 1, Unit = "medium" }
                    }
                }
            };

            await context.Meals.AddRangeAsync(meals);
            await context.SaveChangesAsync();
        }
    }
}
