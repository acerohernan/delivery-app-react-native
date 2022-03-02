import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../styles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../types/navigation";
import { useAppSelector } from "../redux";

/* Variables */
const screenWidth = Dimensions.get("screen").width;

/* Components */

interface LinkProps {
  active?: boolean;
  iconName?: string;
  pageName: keyof DashboardStackParamsList;
}

const NavLink = ({ active, iconName, pageName }: LinkProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  const styles = StyleSheet.create({
    link: {},
    linkIcon: {
      paddingVertical: 10,
    },
    point: {
      height: 7,
      width: 7,
      borderRadius: 10,
      backgroundColor: colors.green,
      position: "absolute",
      right: "35%",
      bottom: 0,
    },
  });

  return (
    <TouchableOpacity
      style={styles.link}
      onPress={() => navigation.navigate(pageName)}
    >
      <Material
        name={iconName ? iconName : "home-outline"}
        color={active ? colors.green : "#C2C2CB"}
        size={30}
        style={styles.linkIcon}
      />
      {active ? <View style={styles.point} /> : null}
    </TouchableOpacity>
  );
};

export default function MainNav() {
  const { orderCreated } = useAppSelector((state) => state.cart);
  const { name } = useRoute<RouteProp<DashboardStackParamsList>>();

  return (
    <View style={[styles.container, styles.elevation, styles.shadowProp]}>
      <NavLink active={name === "Home"} pageName="Home" />
      <NavLink
        iconName="cart-outline"
        pageName="Cart"
        active={name === "Cart"}
      />
      {orderCreated && (
        <NavLink iconName="moped" pageName="Order" active={name === "Order"} />
      )}
      <NavLink
        iconName="account-outline"
        pageName="Profile"
        active={name === "Profile"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 40,
    position: "absolute",
    bottom: 15,
    backgroundColor: "white",
    zIndex: 3,
    marginHorizontal: 20,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 3,
    paddingHorizontal: 30,
  },
  elevation: {
    elevation: 20,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
