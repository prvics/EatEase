namespace EatEase.Models;

public class WeeklyMealPlan
{
    public List<DailyMealPlan> Days { get; set; } = new();
}