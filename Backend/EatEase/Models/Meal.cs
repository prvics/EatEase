namespace EatEase.Models;

public class Meal
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public List<Ingredient> Ingredients { get; set; } = new();
    public string Instructions { get; set; }
}