export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  mealId: number;
}

export interface Meal {
  id: number;
  name: string;
  category: string;
  ingredients: Ingredient[];
  instructions: string;
}

export interface DailyMeals {
  category: string;
  meal: Meal;
}

export interface WeeklyMealPlan {
  days: {
    day: string;
    meals: DailyMeals[];
  }[];
}

export interface PopupMessageInterface {
  visible: boolean;
  duration?: number;
  message: string;
  onClose: () => void;
}
