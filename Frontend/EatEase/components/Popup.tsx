import React, { useEffect } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { PopupMessageInterface } from "@/types/type";

export default function PopupMessage({
  visible,
  duration = 6000,
  message,
  onClose,
}: PopupMessageInterface) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
        <ThemedView style={styles.modalContainer}>
          <ThemedText style={styles.message}>{message}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#a6e7bc",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  message: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
