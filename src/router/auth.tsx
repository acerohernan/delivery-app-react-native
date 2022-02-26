import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamsList } from "../types/navigation";

import LoginScreen from "../screens/auth/login";
import SignUpScreen from "../screens/auth/signup";
import ForgotPasswordScreen from "../screens/auth/forgotPassword";

const AuthStack = createNativeStackNavigator<AuthStackParamsList>();

export default function AuthStackComponent() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{
          title: "Sign Up",
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: "Forgot Password",
        }}
      />
    </AuthStack.Navigator>
  );
}
