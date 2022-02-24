import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../styles";
import Header from "../../components/header";

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
      fontSize: 17,
    },
    deliveryLabel: {
      color: colors.green,
      fontSize: 17,
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
      fontSize: 22,
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

//Main
export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Cart" />
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Items />
          <View style={styles.promo}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../images/coupon.png")}
                style={styles.promoIcon}
              />
              <Text style={styles.promoText}>Add Promo Coden</Text>
            </View>
            <TouchableOpacity>
              <Material name="chevron-right" size={32} />
            </TouchableOpacity>
          </View>
          <Subtotal />
          <Ubication />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Material name="cart-outline" color="white" size={25} />
          <Text style={styles.buttonText}>Checkout</Text>
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
  promo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderColor: "#eee",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 10,
  },
  promoIcon: {
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  promoText: {
    fontWeight: "bold",
    fontSize: 16,
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
