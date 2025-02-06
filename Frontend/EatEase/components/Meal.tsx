import { DailyMeals } from "@/types/type";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TouchableOpacity } from "react-native";
import { styles } from "@/styles/style";

export const renderMealItem = ({
  item,
  day,
  handleRerollMeal,
}: {
  item: DailyMeals;
  day: string;
  handleRerollMeal: (day: string, category: string, id: number) => void;
}) => {
  return (
    <ThemedView style={styles.mealContainer}>
      <ThemedText style={styles.mealCategoryText}>
        {item.category}: {item.meal.name}
      </ThemedText>
      <TouchableOpacity
        style={styles.rerollMeal}
        onPress={() => {
          return handleRerollMeal(day, item.category, item.meal.id);
        }}
      >
        <ThemedText style={styles.rerollMealText}>
          Reroll {item.category}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
