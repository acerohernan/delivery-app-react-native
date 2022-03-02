import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppDispatch } from "../../redux";
import { applyDiscount } from "../../redux/reducers/cart";
import Modal from "../modal";
import Input from "../input";
import { colors } from "../../styles";

interface PromoModalProps {
  closeModal: () => void;
  openModal: () => void;
  isOpen: boolean;
}

export default function CartPromoModal({
  closeModal,
  openModal,
  isOpen,
}: PromoModalProps) {
  const [code, setCode] = useState("");
  const [openError, setOpenError] = useState(false);

  const dispatch = useAppDispatch();

  const handleApplyCode = () => {
    if (code !== "DEMO") {
      return setOpenError(true);
    }

    setOpenError(false);
    dispatch(applyDiscount());
    closeModal();
  };

  return (
    <Modal closeModal={closeModal} openModal={openModal} isOpen={isOpen}>
      <Text style={styles.title}>Enter your promo code</Text>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Material name="close" size={23} />
      </TouchableOpacity>
      <Input
        placeholder="Promo Code"
        iconName="gift-outline"
        onChangeText={(name, text) => setCode(text.toLocaleUpperCase())}
        name="code"
      />
      {openError && code !== "DEMO" && (
        <Text style={styles.error}>
          Please enter a valid code. Try with "DEMO"
        </Text>
      )}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleApplyCode}>
          Apply Code
        </Text>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: colors.green,
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    top: 13,
    right: 13,
  },
});
