import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
