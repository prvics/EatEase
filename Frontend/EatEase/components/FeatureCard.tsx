import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export const FeatureCard = ({ icon, title, description }) => {
  return (
    <ThemedView style={styles.featureCard}>
      <ThemedText style={styles.featureIcon}>{icon}</ThemedText>
      <ThemedView style={styles.featureTextContainer}>
        <ThemedText style={styles.featureTitle}>{title}</ThemedText>
        <ThemedText style={styles.featureDescription}>{description}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
    backgroundColor: "#2C2C2E",
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#505050",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 15,
    padding: 15,
  },
  featureTextContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  featureDescription: {
    fontSize: 14,
    color: "#B0B0B0",
    backgroundColor: "transparent",
  },
});
