namespace EatEase.Models;

public class DailyMealPlan
{
    public string Day { get; set; }
    public List<MealPlan> Meals { get; set; } = new();
}