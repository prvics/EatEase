import { useEffect, useState } from "react";
import { fetchMealPlan, rerollDay, rerollMeal } from "@/services/mealService";
import { WeeklyMealPlan } from "@/types/type";

export const useMealPlan = () => {
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState<{
    [key: string]: { quantity: number; unit: string };
  }>({});

  const getMealPlan = async () => {
    setLoading(true);
    try {
      const data = await fetchMealPlan();
      setMealPlan(data);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateShoppingList = () => {
    const list: { [key: string]: { quantity: number; unit: string } } = {};
    mealPlan?.days.forEach((day) => {
      day.meals.forEach((meal) => {
        meal.meal.ingredients.forEach((ingredient) => {
          if (list[ingredient.name]) {
            list[ingredient.name].quantity += ingredient.quantity;
          } else {
            list[ingredient.name] = {
              quantity: ingredient.quantity,
              unit: ingredient.unit,
            };
          }
        });
      });
    });
    setShoppingList(list);
  };

  useEffect(() => {
    if (mealPlan && Object.keys(mealPlan).length > 0) {
      generateShoppingList();
    }
  }, [mealPlan]);

  useEffect(() => {
    console.log("loading:", loading);
  }, [loading]);

  useEffect(() => {
    console.log("updated mealPlan:", mealPlan);
  }, [mealPlan]);

  useEffect(() => {
    console.log("shopping list", shoppingList);
  }, [shoppingList]);

  const handleRerollMeal = async (
    day: string,
    category: string,
    id: number
  ) => {
    setLoading(true);
    try {
      const data = await rerollMeal(day, category, id);
      if (!data) return;
      setMealPlan((prevMealPlan) => {
        if (!prevMealPlan) return prevMealPlan;
        return {
          ...prevMealPlan,
          days: prevMealPlan.days.map((dayItem) =>
            dayItem.day.toLowerCase() === day.toLowerCase()
              ? {
                  ...dayItem,
                  meals: dayItem.meals.map((mealItem) =>
                    mealItem.category.toLowerCase() === category.toLowerCase()
                      ? { ...mealItem, meal: data.rerolledMeal.meal }
                      : mealItem
                  ),
                }
              : dayItem
          ),
        };
      });
    } catch (error) {
      console.error("Error rerolling meal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRerollDay = async (
    day: string,
    breakfastId: number,
    lunchId: number,
    dinnerId: number
  ) => {
    setLoading(true);

    try {
      const newDayMeals = await rerollDay(day, breakfastId, lunchId, dinnerId);

      if (!newDayMeals || !newDayMeals.day) {
        console.error("Failed to reroll day or missing 'meals' property");
        return;
      }

      console.log("newDayMeals:", newDayMeals);

      setMealPlan((prevMealPlan) => {
        if (!prevMealPlan) return prevMealPlan;

        return {
          ...prevMealPlan,
          days: prevMealPlan.days.map((dayItem) =>
            dayItem.day.toLowerCase() === day.toLowerCase()
              ? {
                  ...dayItem,
                  meals: newDayMeals.meals,
                }
              : dayItem
          ),
        };
      });
    } catch (error) {
      console.error("Error rerolling day:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    mealPlan,
    loading,
    handleRerollMeal,
    handleRerollDay,
    getMealPlan,
    shoppingList,
  };
};
