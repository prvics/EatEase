import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "../ParallaxScrollView";
import EatEaseLogo from "../EatEaseLogo";
import { useMealPlan } from "@/hooks/useMealPlan";
import { renderDayMeals } from "../DayMeal";
import { styles } from "@/styles/style";

export default function MealPrep() {
  const { mealPlan, loading, getMealPlan, handleRerollMeal, handleRerollDay } =
    useMealPlan();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMealPlan();
  }, []);

  //refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await getMealPlan();
    setRefreshing(false);
  };

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
            renderItem={({ item }) =>
              renderDayMeals({
                dayMeals: item,
                handleRerollMeal,
                handleRerollDay,
              })
            }
            keyExtractor={(item) => item.day.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}
