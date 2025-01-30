using EatEase.Models;
using Microsoft.EntityFrameworkCore;

namespace EatEase.Data;

public static class SeedData
{
    public static async Task SeedMealsAndIngredients(AppDbContext context)
        {
            Console.WriteLine("Checking if meals already exist in the database...");
            if (await context.Meals.AnyAsync())
            {
                Console.WriteLine("Meals already exist. Skipping seeding.");
                return;
            }

            Console.WriteLine("No meals found. Seeding data...");
            var breakfastMeals = new List<Meal>
            {
                new Meal
                {
                    Name = "Pancakes",
                    Category = "Breakfast",
                    Instructions = "Mix the ingredients and cook on a pan.",
                    Ingredients = new List<Ingredient>
                    {
                        new Ingredient { Name = "Flour", Quantity = 200, Unit = "g" },
                        new Ingredient { Name = "Eggs", Quantity = 2, Unit = "pieces" },
                        new Ingredient { Name = "Milk", Quantity = 250, Unit = "ml" },
                        new Ingredient { Name = "Baking Powder", Quantity = 1, Unit = "tsp" },
                        new Ingredient { Name = "Butter", Quantity = 20, Unit = "g" }
                    }
                },
                new Meal
                {
                    Name = "Omelette",
                    Category = "Breakfast",
                    Instructions = "Whisk eggs, pour into pan, and cook with filling.",
                    Ingredients = new List<Ingredient>
                    {
                        new Ingredient { Name = "Eggs", Quantity = 3, Unit = "pieces" },
                        new Ingredient { Name = "Cheese", Quantity = 50, Unit = "g" },
                        new Ingredient { Name = "Tomato", Quantity = 1, Unit = "piece" },
                        new Ingredient { Name = "Olive Oil", Quantity = 1, Unit = "tbsp" }
                    }
                }, new Meal
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
            };

            var lunchMeals = new List<Meal>
            {
                new Meal
                {
                    Name = "Chicken Salad",
                    Category = "Lunch",
                    Instructions = "Mix all ingredients and dress with olive oil.",
                    Ingredients = new List<Ingredient>
                    {
                        new Ingredient { Name = "Chicken Breast", Quantity = 200, Unit = "g" },
                        new Ingredient { Name = "Lettuce", Quantity = 100, Unit = "g" },
                        new Ingredient { Name = "Tomato", Quantity = 1, Unit = "piece" },
                        new Ingredient { Name = "Cucumber", Quantity = 1, Unit = "piece" },
                        new Ingredient { Name = "Olive Oil", Quantity = 1, Unit = "tbsp" }
                    }
                },
                new Meal
                {
                    Name = "Veggie Wrap",
                    Category = "Lunch",
                    Instructions = "Fill a wrap with veggies and sauce.",
                    Ingredients = new List<Ingredient>
                    {
                        new Ingredient { Name = "Tortilla", Quantity = 1, Unit = "piece" },
                        new Ingredient { Name = "Hummus", Quantity = 2, Unit = "tbsp" },
                        new Ingredient { Name = "Cucumber", Quantity = 50, Unit = "g" },
                        new Ingredient { Name = "Bell Pepper", Quantity = 1, Unit = "piece" },
                        new Ingredient { Name = "Spinach", Quantity = 50, Unit = "g" }
                    }
                }
            };

            var dinnerMeals = new List<Meal>
            {
                new Meal
                {
                    Name = "Spaghetti Bolognese",
                    Category = "Dinner",
                    Instructions = "Cook pasta and mix with the Bolognese sauce.",
                    Ingredients = new List<Ingredient>
                    {
                        new Ingredient { Name = "Spaghetti", Quantity = 200, Unit = "g" },
                        new Ingredient { Name = "Ground Beef", Quantity = 250, Unit = "g" },
                        new Ingredient { Name = "Tomato Sauce", Quantity = 200, Unit = "ml" },
                        new Ingredient { Name = "Garlic", Quantity = 1, Unit = "clove" },
                        new Ingredient { Name = "Olive Oil", Quantity = 1, Unit = "tbsp" }
                    }
                },
                new Meal
                {
                    Name = "Chicken Stir Fry",
                    Category = "Dinner",
                    Instructions = "Stir fry chicken and vegetables in a wok.",
                    Ingredients = new List<Ingredient>
                    {
                        new Ingredient { Name = "Chicken Breast", Quantity = 200, Unit = "g" },
                        new Ingredient { Name = "Bell Pepper", Quantity = 1, Unit = "piece" },
                        new Ingredient { Name = "Carrot", Quantity = 1, Unit = "piece" },
                        new Ingredient { Name = "Soy Sauce", Quantity = 2, Unit = "tbsp" },
                        new Ingredient { Name = "Olive Oil", Quantity = 1, Unit = "tbsp" }
                    }
                }
            };

            context.Meals.AddRange(breakfastMeals);
            context.Meals.AddRange(lunchMeals);
            context.Meals.AddRange(dinnerMeals);

            await context.SaveChangesAsync();
        }
}