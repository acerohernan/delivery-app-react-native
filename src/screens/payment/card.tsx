import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import { colors } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { useAppDispatch } from "../../redux";
import { changePaymentMethod } from "../../redux/reducers/cart";
import Input from "../../components/input";

/* Variables */
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

/* Components */

interface FormValues {
  card_holder: string;
  card_number: string;
  month_exp: string;
  year_exp: string;
  cvc: string;
}

//Main
export default function CreditCardScreen() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormValues>({
    card_holder: "",
    card_number: "",
    month_exp: "",
    year_exp: "",
    cvc: "",
  });
  const [inputValues, setInputValues] = useState<FormValues>({
    card_holder: "",
    card_number: "",
    month_exp: "",
    year_exp: "",
    cvc: "",
  });

  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  const handleInputValue = (name: string, text: string) => {
    setInputValues({
      ...inputValues,
      [name]: text,
    });
  };

  const handleSelectCard = () => {
    setIsSubmitted(true);
    dispatch(changePaymentMethod("card"));
    navigation.navigate("Checkout");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="My Cards" />
      <View style={styles.body}>
        <ScrollView>
          <Image
            source={require("../../images/card.png")}
            style={styles.image}
          />
          <View style={styles.form}>
            <KeyboardAvoidingView>
              <Input
                iconName="account-outline"
                placeholder="Cardholder Name"
                onChangeText={handleInputValue}
                name="card_holder"
              />
              <Text style={styles.error}>Please enter your full name</Text>
              <Input
                iconName="credit-card-outline"
                placeholder="Card Number"
                onChangeText={handleInputValue}
                name="card_number"
                maxLength={16}
                numeric
              />
              <Text style={styles.error}>Please enter your card number</Text>
              <View style={styles.expiration}>
                <View>
                  <Text style={styles.inputLabel}>EXPIRATION DATE</Text>
                  <View style={styles.someInputContainer}>
                    <TextInput
                      style={styles.expirationInput}
                      placeholder="Month"
                      maxLength={2}
                      keyboardType="numeric"
                      onChangeText={(text) =>
                        handleInputValue("month_exp", text)
                      }
                    />
                    <Text style={{ marginRight: 10, fontSize: 26 }}>/</Text>
                    <TextInput
                      style={styles.expirationInput}
                      placeholder="Year"
                      maxLength={2}
                      keyboardType="numeric"
                      onChangeText={(text) =>
                        handleInputValue("year_exp", text)
                      }
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.inputLabel}>CVV/CVC</Text>
                  <View style={styles.someInputContainer}>
                    <TextInput
                      style={styles.expirationInput}
                      maxLength={3}
                      keyboardType="numeric"
                      onChangeText={(text) => handleInputValue("cvc", text)}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.error}>
                  Please enter your expiration date
                </Text>
                <Text style={[styles.error, { width: 83 }]}>
                  Please enter your CVC
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleSelectCard}
        >
          <Text style={styles.footerText}>Add Card</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    height: screenHeight - 220,
  },

  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },

  form: {
    marginTop: 20,
  },

  inputContainer: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.black,
  },
  input: {
    marginTop: 10,
    backgroundColor: colors.gray,
    padding: 10,
    color: "gray",
    fontWeight: "bold",
    borderRadius: 10,
  },

  someInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardNumberInput: {
    width: (screenWidth - 40) / 4 - 10,
    marginTop: 10,
    backgroundColor: colors.gray,
    padding: 10,
    color: "gray",
    fontWeight: "bold",
    borderRadius: 10,
    textAlign: "center",
  },

  expirationInput: {
    width: (screenWidth - 40) / 4 - 10,
    marginTop: 10,
    backgroundColor: colors.gray,
    padding: 10,
    color: "gray",
    borderRadius: 10,
    textAlign: "center",
    marginRight: 10,
    borderColor: "#C2C2CB",
    borderWidth: 2,
  },

  expiration: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },

  error: {
    color: "red",
  },

  footer: {
    height: 80,
    paddingHorizontal: 20,
  },
  footerButton: {
    backgroundColor: colors.green,
    padding: 13,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    marginLeft: 5,
  },
});
