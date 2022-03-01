import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../styles";
import Header from "../../components/header";
import Modal from "react-native-modalbox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { StatusBar } from "expo-status-bar";
import CartUbication from "../../components/cart/ubication";
import CartItems from "../../components/cart/items";
import CartSubtotal from "../../components/cart/subtotal";

/* Variables */
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

//CheckoutModal
interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CheckoutModal = ({ isOpen, closeModal }: ModalProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  const handleSeeOrderDetails = () => {
    closeModal();
    navigation.navigate("Order");
  };

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

  return (
    <Modal isOpen={isOpen} style={styles.container} position="center">
      <Image source={require("../../images/check.png")} style={styles.image} />
      <Text style={styles.title}>You Place The Order Successfully</Text>
      <Text style={styles.text}>
        You placed the order successfully. You will get your your order within
        25 minutes. Thanks for usings our services. Enjoy your food.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleSeeOrderDetails}>
        <Text style={styles.buttonText}>See order details</Text>
      </TouchableOpacity>
    </Modal>
  );
};

//Main
export default function CheckoutScreen() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <CheckoutModal
          isOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
        />
        <Header title="Checkout" />
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CartUbication />
            <CartItems checkout />
            <View style={styles.payment}>
              <View style={styles.titleContainer}>
                <Text style={styles.paymentTitle}>Payment Method</Text>
                <TouchableOpacity>
                  <Text style={styles.buttonTextChange}>Change</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../images/card.png")}
                  style={styles.paymentIcon}
                />
                <Text style={styles.paymentText}>Visa 4560 XXXX XXXX XXXX</Text>
              </View>
            </View>
            <CartSubtotal />
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalIsOpen(true)}
          >
            <Text style={styles.buttonText}>Confirm order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  body: {
    height: screenHeight - 220,
    paddingHorizontal: 20,
  },
  payment: {
    flexDirection: "column",
    paddingVertical: 10,
    borderColor: "#eee",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonTextChange: {
    color: colors.orange,
    fontWeight: "bold",
    fontSize: 16,
  },
  paymentIcon: {
    width: 60,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  paymentText: {
    color: "gray",
    fontSize: 14,
  },
  footer: {
    height: 80,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.green,
    padding: 13,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    marginLeft: 5,
  },
});
