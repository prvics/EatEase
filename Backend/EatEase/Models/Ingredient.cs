using System.Text.Json.Serialization;

namespace EatEase.Models;

public class Ingredient
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Quantity { get; set; }
    public string Unit { get; set; }
    public int MealId { get; set; }
    
    [JsonIgnore]
    public Meal Meal { get; set; }
}