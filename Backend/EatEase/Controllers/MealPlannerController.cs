using EatEase.Service;
using Microsoft.AspNetCore.Mvc;

namespace EatEase.Controllers;

[ApiController]
[Route("api/controller")]
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

    [HttpGet("reroll/{day}/{mealCategory}/{mealId}")]
    public async Task<IActionResult> RerollMeal(string day, string mealCategory, int mealId)
    {
        var rerolledMeal = await _mealPlannerService.RerollMealAsync(day, mealCategory, mealId);
        if (rerolledMeal == null)
        {
            return NotFound($"No meals found for category '{mealCategory}'.");
        }

        return Ok(new { Day = day, Category = mealCategory, rerolledMeal });
    }

    [HttpGet("reroll-day/{day}/{breakfastId}/{lunchId}/{dinnerId}")]
    public async Task<IActionResult> RerollDay(string day, int breakfastId, int lunchId, int dinnerId)
    {
        if (day == null || breakfastId == null || lunchId == null || dinnerId == null)
        {
            return BadRequest("Can't reroll missing data");
        }
        
        var rerolledMeals = await _mealPlannerService.RerollDayAsync(day, breakfastId, lunchId, dinnerId);
        return Ok(new { Day = day, Meals = rerolledMeals });
    }
}