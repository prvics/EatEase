import { Image, StyleSheet } from "react-native";

export default function EatEaseLogo() {
  return (
    <Image
      source={require("@/assets/images/eatease-logo.png")}
      style={styles.eateaseLogo}
    />
  );
}

const styles = StyleSheet.create({
  eateaseLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
