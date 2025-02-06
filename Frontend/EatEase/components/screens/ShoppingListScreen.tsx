import React, { useState, useEffect } from "react";
import ParallaxScrollView from "../ParallaxScrollView";
import EatEaseLogo from "../EatEaseLogo";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { FlatList, Text, StyleSheet } from "react-native";
import { useMealPlan } from "@/hooks/useMealPlan";

type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

export default function ShoppingListScreen() {
  const { shoppingList, loading } = useMealPlan();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (shoppingList && Object.keys(shoppingList).length > 0) {
      const ingredientList = Object.entries(shoppingList).map(
        ([name, data]) => ({
          name,
          quantity: data.quantity,
          unit: data.unit,
        })
      );
      console.log("Ingredient list from shoppingList:", ingredientList);
      setIngredients(ingredientList);
    } else {
      console.log("No shopping list data found, using default values");
      setIngredients([
        { name: "Flour", quantity: 400, unit: "g" },
        { name: "Eggs", quantity: 19, unit: "pcs" },
        { name: "Milk", quantity: 500, unit: "ml" },
      ]);
    }
  }, [shoppingList]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<EatEaseLogo />}
    >
      <ThemedView>
        <ThemedText style={styles.title}>Here is your shopping list</ThemedText>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={ingredients}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <ThemedView style={styles.item}>
                <ThemedText>{item.name}</ThemedText>
                <ThemedText>
                  {item.quantity} {item.unit}
                </ThemedText>
              </ThemedView>
            )}
          />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
