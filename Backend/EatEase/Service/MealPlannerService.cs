using EatEase.Data;
using EatEase.Models;
using Microsoft.EntityFrameworkCore;


namespace EatEase.Service;

public class MealPlannerService : IMealPlannerService
{
    private readonly AppDbContext _context;

    public MealPlannerService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<WeeklyMealPlan> GenerateWeeklyMealsAsync()
    {
        var weeklyMealPlan = new WeeklyMealPlan();
        var daysOfWeek = new[] { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };
        var mealCategories = new[] { "Breakfast", "Lunch", "Dinner" };

        foreach (var day in daysOfWeek)
        {
            var dailyMealPlan = new DailyMealPlan { Day = day };
            foreach (var category in mealCategories)
            {
                var randomMeal = await _context.Meals
                    .Include(m => m.Ingredients)
                    .Where(m => m.Category == category)
                    .OrderBy(m => Guid.NewGuid())
                    .FirstOrDefaultAsync();

                if (randomMeal != null)
                {
                    dailyMealPlan.Meals.Add(new MealPlan
                    {
                        Category = category,
                        Meal = randomMeal
                    });
                }
            }
            weeklyMealPlan.Days.Add(dailyMealPlan);
        }

        return weeklyMealPlan;
    }
    
    public async Task<MealPlan?> RerollMealAsync(string day, string mealCategory, int mealId)
    {
        var randomMeal = await _context.Meals
            .Include(m => m.Ingredients)
            .Where(m => m.Category == mealCategory && m.Id != mealId)
            .OrderBy(m => Guid.NewGuid())
            .FirstOrDefaultAsync();

        return randomMeal != null
            ? new MealPlan { Category = mealCategory, Meal = randomMeal }
            : null;
    }

    public async Task<List<MealPlan>> RerollDayAsync(string day, int breakfastId, int lunchId, int dinnerId)
    {
        var dailyMeals = new List<MealPlan>();
        
        var updatedBreakfast = await RerollMealAsync(day, "Breakfast", breakfastId);
        dailyMeals.Add(updatedBreakfast);

        var updatedLunch = await RerollMealAsync(day, "Lunch", lunchId);
        dailyMeals.Add(updatedLunch);

        var updatedDinner = await RerollMealAsync(day, "Dinner", dinnerId);
        dailyMeals.Add(updatedDinner);

        Console.WriteLine("dailyMeals: ");
        foreach (var mealPlan in dailyMeals)
        {
            Console.WriteLine($"Category: {mealPlan.Category}, Meal: {mealPlan.Meal.Name}");
        }

        return dailyMeals;
    }
}