using EatEase.Models;

namespace EatEase.Service;

public interface IMealPlannerService
{
    Task<WeeklyMealPlan> GenerateWeeklyMealsAsync();
    Task<MealPlan?> RerollMealAsync(string mealCategory);
    Task<List<MealPlan>> RerollDayAsync();
}