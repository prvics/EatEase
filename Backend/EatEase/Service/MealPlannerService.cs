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
    
    public async Task<MealPlan?> RerollMealAsync(string mealCategory)
    {
        var randomMeal = await _context.Meals
            .Include(m => m.Ingredients)
            .Where(m => m.Category == mealCategory)
            .OrderBy(m => Guid.NewGuid())
            .FirstOrDefaultAsync();

        return randomMeal != null
            ? new MealPlan { Category = mealCategory, Meal = randomMeal }
            : null;
    }

    public async Task<List<MealPlan>> RerollDayAsync()
    {
        var mealCategories = new[] { "Breakfast", "Lunch", "Dinner" };
        var dailyMeals = new List<MealPlan>();

        foreach (var category in mealCategories)
        {
            var randomMeal = await RerollMealAsync(category);
            if (randomMeal != null)
            {
                dailyMeals.Add(randomMeal);
            }
        }

        return dailyMeals;
    }
}