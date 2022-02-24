import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../types/navigation";
import OnboardScreen from "../screens/onboard";
import AuthStackComponent from "./auth";
import HomeScreen from "../screens/dashboard/home";
import RestaurantScreen from "../screens/dashboard/restaurant";
import MenuItemScreen from "../screens/dashboard/menuItem";
import CartScreen from "../screens/dashboard/cart";
import MethodScreen from "../screens/payment/method";

const RootStack = createNativeStackNavigator<RootStackParamsList>();

export default function RootStackComponent() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Home" component={CartScreen} />
        <RootStack.Screen name="Onboard" component={OnboardScreen} />
        <RootStack.Screen name="AuthStack" component={AuthStackComponent} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
