import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../styles";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/header";

/* Variables */
const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

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

export default function OrderScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Order Tracking" />
      <View style={styles.body}>
        <View style={styles.itemContainer}>
          <View style={styles.itemTitleContainer}>
            <Text style={styles.itemTitle}>Order From</Text>
            <Text style={styles.itemRestaurant}>McDonald'S</Text>
          </View>
        </View>
        <Items />
        <Subtotal />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 2,
    backgroundColor: "white",
  },
  body: {
    borderColor: "red",
    borderWidth: 2,
    height: screenHeight - 150,
    paddingHorizontal: 20,
  },
  itemContainer: {},
  itemTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemRestaurant: {
    color: colors.orange,
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {},
});
