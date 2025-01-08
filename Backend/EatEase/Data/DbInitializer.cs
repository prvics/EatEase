using Microsoft.AspNetCore.Identity;

namespace EatEase.Data;

public class DbInitializer
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
}
