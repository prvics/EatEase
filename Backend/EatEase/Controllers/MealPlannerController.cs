using EatEase.Service;
using Microsoft.AspNetCore.Mvc;

namespace EatEase.Controllers;

[Route("api/controller")]
[ApiController]
public class MealPlannerController : ControllerBase
{
    private readonly IMealPlannerService _mealPlannerService;

    public MealPlannerController(IMealPlannerService mealPlannerService)
    {
        _mealPlannerService = mealPlannerService;
    }

    [HttpGet("generate-week")]
    public async Task<IActionResult> GenerateWeek()
    {
        var weeklyMeals = await _mealPlannerService.GenerateWeeklyMealsAsync();
        return Ok(weeklyMeals);
    }

    [HttpGet("reroll/{day}/{mealCategory}")]
    public async Task<IActionResult> RerollMeal(string day, string mealCategory)
    {
        var rerolledMeal = await _mealPlannerService.RerollMealAsync(mealCategory);
        if (rerolledMeal == null)
        {
            return NotFound($"No meals found for category '{mealCategory}'.");
        }

        return Ok(new { Day = day, RerolledMeal = rerolledMeal });
    }

    [HttpGet("reroll-day/{day}")]
    public async Task<IActionResult> RerollDay(string day)
    {
        var rerolledMeals = await _mealPlannerService.RerollDayAsync();
        return Ok(new { Day = day, Meals = rerolledMeals });
    }
}