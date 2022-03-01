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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import CartItems from "../../components/cart/items";
import CartSubtotal from "../../components/cart/subtotal";
import CartUbication from "../../components/cart/ubication";

/* Variables */
const screenHeight = Dimensions.get("screen").height;

export default function CartScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="My Cart" />
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CartItems />
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
          <CartSubtotal />
          <CartUbication />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Checkout")}
        >
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
