import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../styles";
import Header from "../../components/header";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { StatusBar } from "expo-status-bar";
import CartUbication from "../../components/cart/ubication";
import CartItems from "../../components/cart/items";
import CartSubtotal from "../../components/cart/subtotal";
import Modal from "../../components/modal";
import { useAppDispatch, useAppSelector } from "../../redux";
import { createOrder } from "../../redux/reducers/cart";

/* Variables */
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

//CheckoutModal
interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const CheckoutModal = ({ isOpen, closeModal, openModal }: ModalProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  const handleSeeOrderDetails = () => {
    closeModal();
    navigation.navigate("Order");
  };

  const styles = StyleSheet.create({
    container: {
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
      textAlign: "center",
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
    <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal}>
      <View style={styles.container}>
        <Image
          source={require("../../images/check.png")}
          style={styles.image}
        />
        <Text style={styles.title}>You Place The Order Successfully</Text>
        <Text style={styles.text}>
          You placed the order successfully. You will get your your order within
          25 minutes. Thanks for usings our services. Enjoy your food.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSeeOrderDetails}>
          <Text style={styles.buttonText}>See order details</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

//Main
export default function CheckoutScreen() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { paymentMethod } = useAppSelector((state) => state.cart);

  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();
  const dispatch = useAppDispatch();

  const handleConfirmOrder = () => {
    if (!paymentMethod) return Alert.alert("Please select a payment method");

    dispatch(createOrder());
    setModalIsOpen(true);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <CheckoutModal
          isOpen={modalIsOpen}
          closeModal={() => {
            setModalIsOpen(false);
            navigation.navigate("Order");
          }}
          openModal={() => setModalIsOpen(true)}
        />
        <Header title="Checkout" />
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CartUbication />
            <CartItems checkout />
            <View style={styles.payment}>
              <View style={styles.titleContainer}>
                <Text style={styles.paymentTitle}>Payment Method</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("PaymentMethod")}
                >
                  <Text style={styles.buttonTextChange}>
                    {paymentMethod ? "Change" : "Select"}
                  </Text>
                </TouchableOpacity>
              </View>
              {!paymentMethod && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.paymentText}>
                    Please select a payment method
                  </Text>
                </View>
              )}

              {paymentMethod === "card" && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../images/card.png")}
                    style={styles.paymentIcon}
                  />
                  <Text style={styles.paymentText}>
                    Visa XXXX XXXX XXXX XXXX
                  </Text>
                </View>
              )}

              {paymentMethod === "paypal" && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../images/icons/paypal.png")}
                    style={styles.paymentIcon}
                  />
                  <Text style={styles.paymentText}>Paypal</Text>
                </View>
              )}
            </View>
            <CartSubtotal />
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
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
    backgroundColor: "white",
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
