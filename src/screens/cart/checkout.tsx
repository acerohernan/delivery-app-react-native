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
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../styles";
import Header from "../../components/header";
import Modal from "react-native-modalbox";
import ModalComponent from "../../components/modal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { StatusBar } from "expo-status-bar";

/* Variables */
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

/* Components */

//ItemCart
const ItemCart = () => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 20,
      paddingBottom: 10,
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 10,
      marginRight: 20,
    },
    details: {
      width: screenWidth - 130,
      height: 70,
      flexDirection: "column",
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 3,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    price: {
      color: colors.orange,
      fontWeight: "bold",
      fontSize: 18,
    },
    quantityButton: {
      width: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      padding: 7,
      backgroundColor: colors.gray,
      borderRadius: 10,
    },
    quantityText: {
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require("../../images/burger.jpg")} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>Crispy Burguer</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>$30.00</Text>
          <View style={styles.quantityButton}>
            <TouchableOpacity>
              <Material name="minus" size={20} color="gray" />
            </TouchableOpacity>
            <Text style={styles.quantityText}> 2</Text>
            <TouchableOpacity>
              <Material name="plus" size={20} color={colors.orange} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

//Items
const Items = () => {
  return (
    <View>
      <ItemCart />
      <ItemCart />
    </View>
  );
};

//Subtotal
const Subtotal = () => {
  const styles = StyleSheet.create({
    container: {},
    table: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: colors.gray,
    },
    tableItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 5,
    },
    tableLabel: {
      fontSize: 16,
    },
    deliveryLabel: {
      color: colors.green,
      fontSize: 16,
    },
    totalContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderColor: colors.gray,
    },
    total: {
      fontSize: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableItem}>
          <Text style={styles.tableLabel}>Item Total</Text>
          <Text style={styles.tableLabel}>$50.00</Text>
        </View>
        <View style={styles.tableItem}>
          <Text style={styles.tableLabel}>Discount</Text>
          <Text style={styles.tableLabel}>$10.00</Text>
        </View>
        <View style={styles.tableItem}>
          <Text style={styles.deliveryLabel}>Delivery Fee</Text>
          <Text style={styles.deliveryLabel}>Free</Text>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>$70.00</Text>
      </View>
    </View>
  );
};

//Ubication
const Ubication = () => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderColor: colors.gray,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 10,
      marginRight: 20,
    },
    details: {
      width: screenWidth - 120,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: { fontSize: 16, fontWeight: "bold" },
    text: {
      color: "gray",
    },
    button: {},
    buttonText: {
      color: colors.orange,
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require("../../images/map.png")} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Deliver to: Home</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>13A Havinr Street, New York</Text>
      </View>
    </View>
  );
};

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />;
      <CheckoutModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
      <Header title="Checkout" />
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Ubication />
          <Items />
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
          <Subtotal />
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
