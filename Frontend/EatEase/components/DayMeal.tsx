import { FlatList, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { styles } from "@/styles/style";
import { renderMealItem } from "./Meal";
import { DailyMeals } from "@/types/type";

export const renderDayMeals = ({
  dayMeals,
  handleRerollMeal,
  handleRerollDay,
}: {
  dayMeals: { day: string; meals: DailyMeals[] };
  handleRerollMeal: (day: string, category: string, id: number) => void;
  handleRerollDay: (
    day: string,
    breakfastId: number,
    lunchId: number,
    dinnerId: number
  ) => void;
}) => {
  const rerollData = {
    day: dayMeals.day,
    breakfastId: dayMeals.meals[0].meal.id || 0,
    lunchId: dayMeals.meals[1].meal.id || 0,
    dinnerId: dayMeals.meals[2].meal.id || 0,
  };

  return (
    <ThemedView style={styles.dayCard}>
      <ThemedText type="subtitle" style={styles.dayText}>
        {dayMeals.day}
      </ThemedText>
      <FlatList
        data={dayMeals?.meals}
        renderItem={({ item }) =>
          renderMealItem({
            item,
            day: dayMeals.day,
            handleRerollMeal,
          })
        }
        keyExtractor={(item) => item.meal.id.toString()}
      />
      <TouchableOpacity
        style={styles.rerollDay}
        onPress={() =>
          handleRerollDay(
            rerollData.day,
            rerollData.breakfastId,
            rerollData.lunchId,
            rerollData.dinnerId
          )
        }
      >
        <ThemedText style={styles.rerollDayText}>Reroll day</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
