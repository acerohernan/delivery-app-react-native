import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";

/* Variables */
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

interface Props {
  children?: any;
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

export default function Modal({
  children,
  closeModal,
  openModal,
  isOpen,
}: Props) {
  if (!isOpen) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={() => closeModal()}>
      <TouchableOpacity
        onPress={() => openModal()}
        style={styles.body}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(38, 42, 43, 0.542)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  body: {
    backgroundColor: "white",
    zIndex: 4,
    width: screenWidth - 40,
    borderRadius: 20,
    padding: 20,
  },
  image: {},
  text: {},
});
