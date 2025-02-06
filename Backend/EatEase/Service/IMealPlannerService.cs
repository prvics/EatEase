using EatEase.Models;

namespace EatEase.Service;

public interface IMealPlannerService
{
    Task<WeeklyMealPlan> GenerateWeeklyMealsAsync();
    Task<MealPlan?> RerollMealAsync(string day, string mealCategory, int mealId);
    Task<List<MealPlan>> RerollDayAsync(string day,  int breakfastId, int lunchId, int dinnerId);
}