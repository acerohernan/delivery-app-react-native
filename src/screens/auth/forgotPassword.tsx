import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../styles";

import Material from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/button";

/* Variables */

const screenHeight = Dimensions.get("screen").height;

/* Components */

//Input

interface InputProps {
  placeholder: string;
  iconName: string;
}

const Input = ({ placeholder = "", iconName }: InputProps) => {
  const styles = StyleSheet.create({
    container: {
      marginTop: 15,
    },
    input: {
      backgroundColor: colors.gray,
      height: 55,
      borderRadius: 10,
      paddingLeft: 50,
      color: "gray",
      fontSize: 15,
      borderColor: "#C2C2CB",
      borderWidth: 2,
    },
    inputIcon: {
      position: "absolute",
      top: 15,
      left: 15,
      textAlign: "center",
      color: "gray",
    },
  });

  return (
    <View style={styles.container}>
      <TextInput placeholder={placeholder} style={styles.input} />
      <Material name={iconName} style={styles.inputIcon} size={25} />
    </View>
  );
};

//Main

export default function ForgotPasswordScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.text}>
          Please enter your email so we can help you to recover your password.
        </Text>
        <KeyboardAvoidingView>
          <View style={{ marginBottom: 30 }}>
            <Input placeholder="Email " iconName="email-outline" />
          </View>
          <Button title="Create an account" onPress={() => console.log("Hi")} />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.footer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    flexDirection: "column",
  },
  navigation: {
    backgroundColor: "white",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  navigationButton: {
    backgroundColor: colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    borderRadius: 10,
  },

  body: {
    backgroundColor: "white",
    height: screenHeight - 250,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    marginBottom: 15,
  },
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  link: {
    color: colors.green,
    fontWeight: "bold",
  },

  goSignup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  or: {
    textAlign: "center",
    marginVertical: 20,
  },
  footer: {
    backgroundColor: "white",
  },
});
