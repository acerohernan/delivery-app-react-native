import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../styles";
import Header from "../../components/header";
import CartItems from "../../components/cart/items";
import CartSubtotal from "../../components/cart/subtotal";
import CartUbication from "../../components/cart/ubication";
import { useAppSelector } from "../../redux";
import OrderRoadmap from "../../components/cart/roadmap";
import MainNav from "../../components/mainNav";

/* Variables */
const screenHeight = Dimensions.get("screen").height;

export default function OrderScreen() {
  const { orderRestaurant } = useAppSelector((state) => state.cart);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="My Order" linkToHome />
      <MainNav />
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <OrderRoadmap />
          <CartUbication order />
          <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
              <Text style={styles.itemTitle}>Order From</Text>
              <Text style={styles.itemRestaurant}>{orderRestaurant}</Text>
            </View>
          </View>
          <CartItems checkout order />
          <CartSubtotal order />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  body: {
    height: screenHeight - 145,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  itemContainer: {},
  itemTitleContainer: {
    paddingTop: 20,
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
