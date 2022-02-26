import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modalbox";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../styles";

/* Variables */
const screenWidth = Dimensions.get("screen").width;

export default function ModalComponent() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen} style={styles.container} position="center">
      <Image source={require("../images/check.png")} style={styles.image} />
      <Text style={styles.title}>You Place The Order Successfully</Text>
      <Text style={styles.text}>
        You placed the order successfully. You will get your your order within
        25 minutes. Thanks for usings our services. Enjoy your food.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Keep Browsing Food</Text>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 320,
    borderRadius: 30,
    width: screenWidth - 30,
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    color: "gray",
    textAlign: "center",
    fontSize: 15,
  },
  button: {
    marginTop: 30,
  },
  buttonText: {
    color: colors.green,
    fontSize: 17,
    fontWeight: "bold",
  },
});
