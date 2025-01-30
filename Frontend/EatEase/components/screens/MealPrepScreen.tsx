import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import ParallaxScrollView from "../ParallaxScrollView";
import EatEaseLogo from "../EatEaseLogo";
import { HOST_WITH_PORT } from "@/env";

const sampleData = [
  {
    days: [
      {
        day: "Monday",
        meals: [
          {
            category: "Breakfast",
            meal: {
              id: 2,
              name: "Omelette",
              category: "Breakfast",
              ingredients: [
                {
                  id: 6,
                  name: "Eggs",
                  quantity: 3,
                  unit: "pieces",
                  mealId: 2,
                },
                {
                  id: 7,
                  name: "Cheese",
                  quantity: 50,
                  unit: "g",
                  mealId: 2,
                },
                {
                  id: 8,
                  name: "Tomato",
                  quantity: 1,
                  unit: "piece",
                  mealId: 2,
                },
                {
                  id: 9,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 2,
                },
              ],
              instructions: "Whisk eggs, pour into pan, and cook with filling.",
            },
          },
          {
            category: "Lunch",
            meal: {
              id: 4,
              name: "Veggie Wrap",
              category: "Lunch",
              ingredients: [
                {
                  id: 15,
                  name: "Tortilla",
                  quantity: 1,
                  unit: "piece",
                  mealId: 4,
                },
                {
                  id: 16,
                  name: "Hummus",
                  quantity: 2,
                  unit: "tbsp",
                  mealId: 4,
                },
                {
                  id: 17,
                  name: "Cucumber",
                  quantity: 50,
                  unit: "g",
                  mealId: 4,
                },
                {
                  id: 18,
                  name: "Bell Pepper",
                  quantity: 1,
                  unit: "piece",
                  mealId: 4,
                },
                {
                  id: 19,
                  name: "Spinach",
                  quantity: 50,
                  unit: "g",
                  mealId: 4,
                },
              ],
              instructions: "Fill a wrap with veggies and sauce.",
            },
          },
          {
            category: "Dinner",
            meal: {
              id: 5,
              name: "Spaghetti Bolognese",
              category: "Dinner",
              ingredients: [
                {
                  id: 20,
                  name: "Spaghetti",
                  quantity: 200,
                  unit: "g",
                  mealId: 5,
                },
                {
                  id: 21,
                  name: "Ground Beef",
                  quantity: 250,
                  unit: "g",
                  mealId: 5,
                },
                {
                  id: 22,
                  name: "Tomato Sauce",
                  quantity: 200,
                  unit: "ml",
                  mealId: 5,
                },
                {
                  id: 23,
                  name: "Garlic",
                  quantity: 1,
                  unit: "clove",
                  mealId: 5,
                },
                {
                  id: 24,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 5,
                },
              ],
              instructions: "Cook pasta and mix with the Bolognese sauce.",
            },
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            category: "Breakfast",
            meal: {
              id: 2,
              name: "Omelette",
              category: "Breakfast",
              ingredients: [
                {
                  id: 6,
                  name: "Eggs",
                  quantity: 3,
                  unit: "pieces",
                  mealId: 2,
                },
                {
                  id: 7,
                  name: "Cheese",
                  quantity: 50,
                  unit: "g",
                  mealId: 2,
                },
                {
                  id: 8,
                  name: "Tomato",
                  quantity: 1,
                  unit: "piece",
                  mealId: 2,
                },
                {
                  id: 9,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 2,
                },
              ],
              instructions: "Whisk eggs, pour into pan, and cook with filling.",
            },
          },
          {
            category: "Lunch",
            meal: {
              id: 3,
              name: "Chicken Salad",
              category: "Lunch",
              ingredients: [
                {
                  id: 10,
                  name: "Chicken Breast",
                  quantity: 200,
                  unit: "g",
                  mealId: 3,
                },
                {
                  id: 11,
                  name: "Lettuce",
                  quantity: 100,
                  unit: "g",
                  mealId: 3,
                },
                {
                  id: 12,
                  name: "Tomato",
                  quantity: 1,
                  unit: "piece",
                  mealId: 3,
                },
                {
                  id: 13,
                  name: "Cucumber",
                  quantity: 1,
                  unit: "piece",
                  mealId: 3,
                },
                {
                  id: 14,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 3,
                },
              ],
              instructions: "Mix all ingredients and dress with olive oil.",
            },
          },
          {
            category: "Dinner",
            meal: {
              id: 5,
              name: "Spaghetti Bolognese",
              category: "Dinner",
              ingredients: [
                {
                  id: 20,
                  name: "Spaghetti",
                  quantity: 200,
                  unit: "g",
                  mealId: 5,
                },
                {
                  id: 21,
                  name: "Ground Beef",
                  quantity: 250,
                  unit: "g",
                  mealId: 5,
                },
                {
                  id: 22,
                  name: "Tomato Sauce",
                  quantity: 200,
                  unit: "ml",
                  mealId: 5,
                },
                {
                  id: 23,
                  name: "Garlic",
                  quantity: 1,
                  unit: "clove",
                  mealId: 5,
                },
                {
                  id: 24,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 5,
                },
              ],
              instructions: "Cook pasta and mix with the Bolognese sauce.",
            },
          },
        ],
      },
      {
        day: "Wednesday",
        meals: [
          {
            category: "Breakfast",
            meal: {
              id: 2,
              name: "Omelette",
              category: "Breakfast",
              ingredients: [
                {
                  id: 6,
                  name: "Eggs",
                  quantity: 3,
                  unit: "pieces",
                  mealId: 2,
                },
                {
                  id: 7,
                  name: "Cheese",
                  quantity: 50,
                  unit: "g",
                  mealId: 2,
                },
                {
                  id: 8,
                  name: "Tomato",
                  quantity: 1,
                  unit: "piece",
                  mealId: 2,
                },
                {
                  id: 9,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 2,
                },
              ],
              instructions: "Whisk eggs, pour into pan, and cook with filling.",
            },
          },
          {
            category: "Lunch",
            meal: {
              id: 3,
              name: "Chicken Salad",
              category: "Lunch",
              ingredients: [
                {
                  id: 10,
                  name: "Chicken Breast",
                  quantity: 200,
                  unit: "g",
                  mealId: 3,
                },
                {
                  id: 11,
                  name: "Lettuce",
                  quantity: 100,
                  unit: "g",
                  mealId: 3,
                },
                {
                  id: 12,
                  name: "Tomato",
                  quantity: 1,
                  unit: "piece",
                  mealId: 3,
                },
                {
                  id: 13,
                  name: "Cucumber",
                  quantity: 1,
                  unit: "piece",
                  mealId: 3,
                },
                {
                  id: 14,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 3,
                },
              ],
              instructions: "Mix all ingredients and dress with olive oil.",
            },
          },
          {
            category: "Dinner",
            meal: {
              id: 6,
              name: "Chicken Stir Fry",
              category: "Dinner",
              ingredients: [
                {
                  id: 25,
                  name: "Chicken Breast",
                  quantity: 200,
                  unit: "g",
                  mealId: 6,
                },
                {
                  id: 26,
                  name: "Bell Pepper",
                  quantity: 1,
                  unit: "piece",
                  mealId: 6,
                },
                {
                  id: 27,
                  name: "Carrot",
                  quantity: 1,
                  unit: "piece",
                  mealId: 6,
                },
                {
                  id: 28,
                  name: "Soy Sauce",
                  quantity: 2,
                  unit: "tbsp",
                  mealId: 6,
                },
                {
                  id: 29,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 6,
                },
              ],
              instructions: "Stir fry chicken and vegetables in a wok.",
            },
          },
        ],
      },
      {
        day: "Thursday",
        meals: [
          {
            category: "Breakfast",
            meal: {
              id: 1,
              name: "Pancakes",
              category: "Breakfast",
              ingredients: [
                {
                  id: 1,
                  name: "Flour",
                  quantity: 200,
                  unit: "g",
                  mealId: 1,
                },
                {
                  id: 2,
                  name: "Eggs",
                  quantity: 2,
                  unit: "pieces",
                  mealId: 1,
                },
                {
                  id: 3,
                  name: "Milk",
                  quantity: 250,
                  unit: "ml",
                  mealId: 1,
                },
                {
                  id: 4,
                  name: "Baking Powder",
                  quantity: 1,
                  unit: "tsp",
                  mealId: 1,
                },
                {
                  id: 5,
                  name: "Butter",
                  quantity: 20,
                  unit: "g",
                  mealId: 1,
                },
              ],
              instructions: "Mix the ingredients and cook on a pan.",
            },
          },
          {
            category: "Lunch",
            meal: {
              id: 4,
              name: "Veggie Wrap",
              category: "Lunch",
              ingredients: [
                {
                  id: 15,
                  name: "Tortilla",
                  quantity: 1,
                  unit: "piece",
                  mealId: 4,
                },
                {
                  id: 16,
                  name: "Hummus",
                  quantity: 2,
                  unit: "tbsp",
                  mealId: 4,
                },
                {
                  id: 17,
                  name: "Cucumber",
                  quantity: 50,
                  unit: "g",
                  mealId: 4,
                },
                {
                  id: 18,
                  name: "Bell Pepper",
                  quantity: 1,
                  unit: "piece",
                  mealId: 4,
                },
                {
                  id: 19,
                  name: "Spinach",
                  quantity: 50,
                  unit: "g",
                  mealId: 4,
                },
              ],
              instructions: "Fill a wrap with veggies and sauce.",
            },
          },
          {
            category: "Dinner",
            meal: {
              id: 5,
              name: "Spaghetti Bolognese",
              category: "Dinner",
              ingredients: [
                {
                  id: 20,
                  name: "Spaghetti",
                  quantity: 200,
                  unit: "g",
                  mealId: 5,
                },
                {
                  id: 21,
                  name: "Ground Beef",
                  quantity: 250,
                  unit: "g",
                  mealId: 5,
                },
                {
                  id: 22,
                  name: "Tomato Sauce",
                  quantity: 200,
                  unit: "ml",
                  mealId: 5,
                },
                {
                  id: 23,
                  name: "Garlic",
                  quantity: 1,
                  unit: "clove",
                  mealId: 5,
                },
                {
                  id: 24,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 5,
                },
              ],
              instructions: "Cook pasta and mix with the Bolognese sauce.",
            },
          },
        ],
      },
      {
        day: "Friday",
        meals: [
          {
            category: "Breakfast",
            meal: {
              id: 2,
              name: "Omelette",
              category: "Breakfast",
              ingredients: [
                {
                  id: 6,
                  name: "Eggs",
                  quantity: 3,
                  unit: "pieces",
                  mealId: 2,
                },
                {
                  id: 7,
                  name: "Cheese",
                  quantity: 50,
                  unit: "g",
                  mealId: 2,
                },
                {
                  id: 8,
                  name: "Tomato",
                  quantity: 1,
                  unit: "piece",
                  mealId: 2,
                },
                {
                  id: 9,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 2,
                },
              ],
              instructions: "Whisk eggs, pour into pan, and cook with filling.",
            },
          },
          {
            category: "Lunch",
            meal: {
              id: 3,
              name: "Chicken Salad",
              category: "Lunch",
              ingredients: [
                {
                  id: 10,
                  name: "Chicken Breast",
                  quantity: 200,
                  unit: "g",
                  mealId: 3,
                },
                {
                  id: 11,
                  name: "Lettuce",
                  quantity: 100,
                  unit: "g",
                  mealId: 3,
                },
                {
                  id: 12,
                  name: "Tomato",
                  quantity: 1,
                  unit: "piece",
                  mealId: 3,
                },
                {
                  id: 13,
                  name: "Cucumber",
                  quantity: 1,
                  unit: "piece",
                  mealId: 3,
                },
                {
                  id: 14,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 3,
                },
              ],
              instructions: "Mix all ingredients and dress with olive oil.",
            },
          },
          {
            category: "Dinner",
            meal: {
              id: 5,
              name: "Spaghetti Bolognese",
              category: "Dinner",
              ingredients: [
                {
                  id: 20,
                  name: "Spaghetti",
                  quantity: 200,
                  unit: "g",
                  mealId: 5,
                },
                {
                  id: 21,
                  name: "Ground Beef",
                  quantity: 250,
                  unit: "g",
                  mealId: 5,
                },
                {
                  id: 22,
                  name: "Tomato Sauce",
                  quantity: 200,
                  unit: "ml",
                  mealId: 5,
                },
                {
                  id: 23,
                  name: "Garlic",
                  quantity: 1,
                  unit: "clove",
                  mealId: 5,
                },
                {
                  id: 24,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 5,
                },
              ],
              instructions: "Cook pasta and mix with the Bolognese sauce.",
            },
          },
        ],
      },
      {
        day: "Saturday",
        meals: [
          {
            category: "Breakfast",
            meal: {
              id: 2,
              name: "Omelette",
              category: "Breakfast",
              ingredients: [
                {
                  id: 6,
                  name: "Eggs",
                  quantity: 3,
                  unit: "pieces",
                  mealId: 2,
                },
                {
                  id: 7,
                  name: "Cheese",
                  quantity: 50,
                  unit: "g",
                  mealId: 2,
                },
                {
                  id: 8,
                  name: "Tomato",
                  quantity: 1,
                  unit: "piece",
                  mealId: 2,
                },
                {
                  id: 9,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 2,
                },
              ],
              instructions: "Whisk eggs, pour into pan, and cook with filling.",
            },
          },
          {
            category: "Lunch",
            meal: {
              id: 4,
              name: "Veggie Wrap",
              category: "Lunch",
              ingredients: [
                {
                  id: 15,
                  name: "Tortilla",
                  quantity: 1,
                  unit: "piece",
                  mealId: 4,
                },
                {
                  id: 16,
                  name: "Hummus",
                  quantity: 2,
                  unit: "tbsp",
                  mealId: 4,
                },
                {
                  id: 17,
                  name: "Cucumber",
                  quantity: 50,
                  unit: "g",
                  mealId: 4,
                },
                {
                  id: 18,
                  name: "Bell Pepper",
                  quantity: 1,
                  unit: "piece",
                  mealId: 4,
                },
                {
                  id: 19,
                  name: "Spinach",
                  quantity: 50,
                  unit: "g",
                  mealId: 4,
                },
              ],
              instructions: "Fill a wrap with veggies and sauce.",
            },
          },
          {
            category: "Dinner",
            meal: {
              id: 6,
              name: "Chicken Stir Fry",
              category: "Dinner",
              ingredients: [
                {
                  id: 25,
                  name: "Chicken Breast",
                  quantity: 200,
                  unit: "g",
                  mealId: 6,
                },
                {
                  id: 26,
                  name: "Bell Pepper",
                  quantity: 1,
                  unit: "piece",
                  mealId: 6,
                },
                {
                  id: 27,
                  name: "Carrot",
                  quantity: 1,
                  unit: "piece",
                  mealId: 6,
                },
                {
                  id: 28,
                  name: "Soy Sauce",
                  quantity: 2,
                  unit: "tbsp",
                  mealId: 6,
                },
                {
                  id: 29,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 6,
                },
              ],
              instructions: "Stir fry chicken and vegetables in a wok.",
            },
          },
        ],
      },
      {
        day: "Sunday",
        meals: [
          {
            category: "Breakfast",
            meal: {
              id: 1,
              name: "Pancakes",
              category: "Breakfast",
              ingredients: [
                {
                  id: 1,
                  name: "Flour",
                  quantity: 200,
                  unit: "g",
                  mealId: 1,
                },
                {
                  id: 2,
                  name: "Eggs",
                  quantity: 2,
                  unit: "pieces",
                  mealId: 1,
                },
                {
                  id: 3,
                  name: "Milk",
                  quantity: 250,
                  unit: "ml",
                  mealId: 1,
                },
                {
                  id: 4,
                  name: "Baking Powder",
                  quantity: 1,
                  unit: "tsp",
                  mealId: 1,
                },
                {
                  id: 5,
                  name: "Butter",
                  quantity: 20,
                  unit: "g",
                  mealId: 1,
                },
              ],
              instructions: "Mix the ingredients and cook on a pan.",
            },
          },
          {
            category: "Lunch",
            meal: {
              id: 4,
              name: "Veggie Wrap",
              category: "Lunch",
              ingredients: [
                {
                  id: 15,
                  name: "Tortilla",
                  quantity: 1,
                  unit: "piece",
                  mealId: 4,
                },
                {
                  id: 16,
                  name: "Hummus",
                  quantity: 2,
                  unit: "tbsp",
                  mealId: 4,
                },
                {
                  id: 17,
                  name: "Cucumber",
                  quantity: 50,
                  unit: "g",
                  mealId: 4,
                },
                {
                  id: 18,
                  name: "Bell Pepper",
                  quantity: 1,
                  unit: "piece",
                  mealId: 4,
                },
                {
                  id: 19,
                  name: "Spinach",
                  quantity: 50,
                  unit: "g",
                  mealId: 4,
                },
              ],
              instructions: "Fill a wrap with veggies and sauce.",
            },
          },
          {
            category: "Dinner",
            meal: {
              id: 6,
              name: "Chicken Stir Fry",
              category: "Dinner",
              ingredients: [
                {
                  id: 25,
                  name: "Chicken Breast",
                  quantity: 200,
                  unit: "g",
                  mealId: 6,
                },
                {
                  id: 26,
                  name: "Bell Pepper",
                  quantity: 1,
                  unit: "piece",
                  mealId: 6,
                },
                {
                  id: 27,
                  name: "Carrot",
                  quantity: 1,
                  unit: "piece",
                  mealId: 6,
                },
                {
                  id: 28,
                  name: "Soy Sauce",
                  quantity: 2,
                  unit: "tbsp",
                  mealId: 6,
                },
                {
                  id: 29,
                  name: "Olive Oil",
                  quantity: 1,
                  unit: "tbsp",
                  mealId: 6,
                },
              ],
              instructions: "Stir fry chicken and vegetables in a wok.",
            },
          },
        ],
      },
    ],
  },
];

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  mealId: number;
}

interface Meal {
  id: number;
  name: string;
  category: string;
  ingredients: Ingredient[];
  instructions: string;
}

interface DailyMeals {
  category: string;
  meal: Meal;
}

interface WeeklyMealPlan {
  days: {
    day: string;
    meals: DailyMeals[];
  }[];
}

const API_URL = `${HOST_WITH_PORT}/api/controller/generate-week`;

export default function MealPrep() {
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);

  /* useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const data = sampleData[0];
        setMealPlan(data);
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, []); */

  const fetchMealPlan = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);

      const data = await response.json();
      console.log(data);
      setMealPlan(data);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealPlan();
  }, []);

  //refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchMealPlan();
    alert("hi");
    setRefreshing(false);
  };

  const rerollMeal = (day: string, category: string) => {
    const newMeal: Meal = {
      id: Date.now(),
      name: `${category} New Dish`,
      category,
      ingredients: [
        {
          id: Date.now(),
          name: `${category} New Ingredient`,
          quantity: 1,
          unit: "piece",
          mealId: Date.now(),
        },
      ],
      instructions: `Instructions for new ${category} dish.`,
    };

    setMealPlan((prevPlan) =>
      prevPlan
        ? {
            ...prevPlan,
            days: prevPlan.days.map((dayMeal) =>
              dayMeal.day === day
                ? {
                    ...dayMeal,
                    meals: dayMeal.meals.map((meal) =>
                      meal.category === category
                        ? { ...meal, meal: newMeal }
                        : meal
                    ),
                  }
                : dayMeal
            ),
          }
        : prevPlan
    );
  };

  const renderMealItem = ({ item, day }: { item: DailyMeals; day: string }) => (
    <ThemedView style={styles.mealContainer}>
      <ThemedText style={styles.mealCategoryText}>
        {item.category}: {item.meal.name}
      </ThemedText>
      <TouchableOpacity
        style={styles.rerollMeal}
        onPress={() => rerollMeal(day, item.category)}
      >
        <ThemedText style={styles.rerollMealText}>
          Reroll {item.category}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  const renderDayMeals = (dayMeals: { day: string; meals: DailyMeals[] }) => (
    <ThemedView style={styles.dayCard}>
      <ThemedText type="subtitle" style={styles.dayText}>
        {dayMeals.day}
      </ThemedText>
      <FlatList
        data={dayMeals.meals}
        renderItem={({ item }) => renderMealItem({ item, day: dayMeals.day })}
        keyExtractor={(item) => item.meal.id.toString()}
      />
      <TouchableOpacity style={styles.rerollDay}>
        <ThemedText style={styles.rerollDayText}>Reroll day</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "1D3D47" }}
        headerImage={<EatEaseLogo />}
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title">
            Your Delicious and Healthy Meal Plan for the Week!
          </ThemedText>

          <FlatList
            data={mealPlan?.days}
            renderItem={({ item }) => renderDayMeals(item)}
            keyExtractor={(item) => item.day}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  dayContainer: {
    marginBottom: 16,
  },
  mealItem: {
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  dayCard: {
    backgroundColor: "#2C2C2E",

    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
    padding: 20,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dayText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  mealContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 12,
    padding: 12,
    backgroundColor: "#a6e7bc",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  mealCategoryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textAlign: "center",
  },
  rerollMeal: {
    padding: 15,
    color: "#333",
    backgroundColor: "#2C2C2E",
    borderRadius: 10,
    width: "50%",
    alignSelf: "center",
    justifyContent: "center",
  },
  rerollMealText: {
    textAlign: "center",
  },
  rerollDay: {
    width: "50%",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#a6e7bc",
    alignSelf: "center",
  },
  rerollDayText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
});
