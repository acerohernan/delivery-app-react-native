import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../types/navigation";

import HomeScreen from "../screens/dashboard/home";
import RestaurantScreen from "../screens/dashboard/restaurant";
import MenuItemScreen from "../screens/dashboard/menuItem";
import CartScreen from "../screens/cart/cart";
import CheckoutScreen from "../screens/cart/checkout";
import OrderScreen from "../screens/cart/order";
import MethodScreen from "../screens/payment/method";
import CreditCardScreen from "../screens/payment/card";
import ProfileScreen from "../screens/dashboard/profile";
import AddressScreen from "../screens/cart/address";
import NewAddressScreen from "../screens/cart/newAddress";

const DashBoardStack = createNativeStackNavigator<DashboardStackParamsList>();

export default function DashboardStackComponent() {
  return (
    <DashBoardStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <DashBoardStack.Screen name="Home" component={HomeScreen} />
      <DashBoardStack.Screen name="Profile" component={ProfileScreen} />
      <DashBoardStack.Screen name="Restaurant" component={RestaurantScreen} />
      <DashBoardStack.Screen name="MenuItem" component={MenuItemScreen} />
      <DashBoardStack.Screen name="Cart" component={CartScreen} />
      <DashBoardStack.Screen name="Checkout" component={CheckoutScreen} />
      <DashBoardStack.Screen name="Order" component={OrderScreen} />
      <DashBoardStack.Screen name="PaymentMethod" component={MethodScreen} />
      <DashBoardStack.Screen
        name="CreditCardMethod"
        component={CreditCardScreen}
      />
      <DashBoardStack.Screen name="Address" component={AddressScreen} />
      <DashBoardStack.Screen name="NewAddress" component={NewAddressScreen} />
    </DashBoardStack.Navigator>
  );
}
