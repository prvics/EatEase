import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ParallaxScrollView from "../ParallaxScrollView";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { FeatureCard } from "../FeatureCard";
import EatEaseLogo from "../EatEaseLogo";
import PopupMessage from "../Popup";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const showPopup = () => {
    setVisible(true);
  };

  const hidePopup = () => {
    setVisible(false);
  };

  const generateWeek = async () => {
    navigation.navigate("meal-prep");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "1D3D47" }}
      headerImage={<EatEaseLogo />}
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Welcome to EatEase!</ThemedText>
        <ThemedText>
          Your smart meal planner for a healthier lifestyle.
        </ThemedText>
        <ThemedView style={styles.features}>
          <FeatureCard
            icon="🥗"
            title="Healthy Meal Suggestions"
            description="Get randomly selected, balanced meals for breakfast, lunch, and dinner."
          />
          <FeatureCard
            icon="🛒"
            title="Smart Shopping List"
            description="Automatically generate a shopping list with the exact quantities you need."
          />
          <FeatureCard
            icon="🌟"
            title="Personalized Choices"
            description="Customize meals based on your preferences and dietary needs."
          />
        </ThemedView>
        <TouchableOpacity style={styles.ctaButton} onPress={generateWeek}>
          <ThemedText style={styles.ctaText}>Get Started</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctaButton} onPress={showPopup}>
          <ThemedText style={styles.ctaText}>PopUP</ThemedText>
          <PopupMessage
            visible={visible}
            message={"hey Im a popup 6s and ill go"}
            onClose={hidePopup}
          />
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  eateaseLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  title: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  features: {
    marginVertical: 20,
  },
  ctaButton: {
    marginTop: 30,
    backgroundColor: "#a6e7bc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  ctaText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "bold",
  },
});
