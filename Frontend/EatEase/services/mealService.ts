import { GENERATE_WEEK, HOST_WITH_PORT, REROLL_DAY, REROLL_MEAL } from "@/env";

export const fetchMealPlan = async () => {
  try {
    const response = await fetch(HOST_WITH_PORT + GENERATE_WEEK);
    const data = await response.json();
    console.log("fetchmealplan:", data);
    return data;
  } catch (error) {
    console.error("Error fetching meal plan:", error);
  }
};

export const rerollDay = async (
  day: string,
  breakfastId: number,
  lunchId: number,
  dinnerId: number
) => {
  try {
    const response = await fetch(
      `${HOST_WITH_PORT}${REROLL_DAY}/${day}/${breakfastId}/${lunchId}/${dinnerId}`
    );
    const data = await response.json();
    console.log("reorollDay:", data);
    return data;
  } catch (error) {
    console.error("Error rerolling day:", error);
  }
};

export const rerollMeal = async (
  day: string,
  mealCategory: string,
  mealId: number
) => {
  try {
    const response = await fetch(
      `${HOST_WITH_PORT}${REROLL_MEAL}/${day}/${mealCategory}/${mealId}`
    );
    const data = await response.json();
    console.log("reorollMeal:", data);
    return data;
  } catch (error) {
    console.error("Error rerolling meal:", error);
  }
};
