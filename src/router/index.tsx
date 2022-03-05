import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../types/navigation";
import OnboardScreen from "../screens/onboard";

import AuthStackComponent from "./auth";
import DashboardStackComponent from "./dashboard";
import { useAppSelector } from "../redux";

const RootStack = createNativeStackNavigator<RootStackParamsList>();

export default function RootStackComponent() {
  const { isLogin, showOnboard } = useAppSelector((state) => state.user);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {showOnboard && (
          <RootStack.Screen name="Onboard" component={OnboardScreen} />
        )}
        {isLogin && (
          <RootStack.Screen
            name="DashboardStack"
            component={DashboardStackComponent}
          />
        )}
        {!isLogin && (
          <RootStack.Screen name="AuthStack" component={AuthStackComponent} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
