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
import { useAppDispatch, useAppSelector } from "../../redux";
import MainNav from "../../components/mainNav";
import Modal from "../../components/modal";
import Input from "../../components/input";
import { applyDiscount } from "../../redux/reducers/cart";
import CartPromoModal from "../../components/cart/promoModal";

/* Variables */
const screenHeight = Dimensions.get("screen").height;

export default function CartScreen() {
  const [openPromoModal, setOpenModalOpen] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  const { items } = useAppSelector((state) => state.cart);
  const { items: addressItems, selectedAddress } = useAppSelector(
    (state) => state.address
  );

  const handleGoToCheckout = () => {
    if (addressItems.length === 0 || !selectedAddress.name_tag)
      return Alert.alert("Please add an address");

    navigation.navigate("Checkout");
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Header title="My Cart" />
        <MainNav />
        <View style={styles.bodyEmpty}>
          <Image
            source={require("../../images/icons/cart-empty.png")}
            style={styles.imageEmpty}
          />
          <Text style={styles.textEmpty}>
            Oh! That seems that you cart is empty.
          </Text>
          <Text style={styles.textEmpty}>Don´t stay hungry!</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.buttonEmpty}>See Restaurants</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="My Cart" />
      <CartPromoModal
        closeModal={() => setOpenModalOpen(false)}
        openModal={() => setOpenModalOpen(true)}
        isOpen={openPromoModal}
      />
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CartItems />
          <TouchableOpacity
            style={styles.promo}
            onPress={() => setOpenModalOpen(true)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../images/coupon.png")}
                style={styles.promoIcon}
              />
              <Text style={styles.promoText}>Add Promo Coden</Text>
            </View>
            <TouchableOpacity onPress={() => setOpenModalOpen(true)}>
              <Material name="chevron-right" size={32} />
            </TouchableOpacity>
          </TouchableOpacity>
          <CartSubtotal />
          <CartUbication />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleGoToCheckout}>
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
  bodyEmpty: {
    height: screenHeight - 150,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  imageEmpty: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  textEmpty: {
    marginTop: 10,
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  buttonEmpty: {
    marginTop: 40,
    color: colors.green,
    fontSize: 16,
    fontWeight: "bold",
  },
});
