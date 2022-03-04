import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../styles";

import Material from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/button";
import { emailRegex } from "../../utils/regex";

/* Variables */

const screenHeight = Dimensions.get("screen").height;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const email_validation = emailRegex.test(email);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const handleSendEmail = () => {
    if (!email) return Alert.alert("Please enter your email");

    if (error) return Alert.alert("Please enter a valid email");

    if (email && email_validation) setIsSubmitted(true);
  };

  const handleEmailValue = (email: string) => {
    setEmail(email);
  };

  const handleEmailValidation = () => {
    if (email_validation) setError(false);
    if (!email_validation) setError(true);
  };

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
            <View style={styles.inputContainer}>
              <TextInput
                value={email}
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
                autoCompleteType="email"
                onChangeText={handleEmailValue}
                onEndEditing={handleEmailValidation}
              />
              <Material
                name="email-outline"
                style={styles.inputIcon}
                size={25}
              />
            </View>
            {error && (
              <Text style={{ color: "red" }}>Please enter a valid email</Text>
            )}
          </View>
          <Button title="Send email" onPress={handleSendEmail} />
          {isSubmitted && (
            <Text style={{ color: "red" }}>
              The email doesn't exists. Please create an account.
            </Text>
          )}
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
  inputContainer: {
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
