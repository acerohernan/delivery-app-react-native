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
  Alert,
} from "react-native";
import React, { useState } from "react";
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
  const [errors, setErrors] = useState({
    card_holder: false,
    card_number: false,
    month_exp: false,
    year_exp: false,
    cvc: false,
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

  const { card_holder, card_number, month_exp, year_exp, cvc } = inputValues;

  const handleInputValue = (name: string, text: string) => {
    setInputValues({
      ...inputValues,
      [name]: text,
    });
  };

  const handleInputValidation = (name: string, error: boolean = true) => {
    return () => {
      if (error) setErrors({ ...errors, [name]: true });
      if (!error) setErrors({ ...errors, [name]: false });
    };
  };

  const handleSelectCard = () => {
    if (!card_holder || !card_number || !month_exp || !year_exp || !cvc) {
      return Alert.alert("Please complete the input fields.");
    }

    if (
      !errors.card_holder &&
      !errors.card_number &&
      !errors.month_exp &&
      !errors.year_exp &&
      !errors.cvc
    ) {
      dispatch(changePaymentMethod("card"));
      navigation.navigate("Checkout");
    }

    return;
  };

  /* Input validation */
  const card_holder_error = !/^[a-zA-Z]+$/.test(
    card_holder.split(" ").join("")
  );
  const card_number_error = card_number.length !== 16;
  const month_exp_error = month_exp.length !== 2;
  const year_exp_error = year_exp.length !== 2;
  const cvc_error = cvc.length !== 3;

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
                onEndEditing={handleInputValidation(
                  "card_holder",
                  card_holder_error
                )}
              />
              {errors.card_holder && (
                <Text style={styles.error}>
                  Please enter a valid name (only letters)
                </Text>
              )}
              <Input
                iconName="credit-card-outline"
                placeholder="Card Number"
                onChangeText={(name, text) => handleInputValue(name, text)}
                name="card_number"
                maxLength={16}
                numeric
                onEndEditing={handleInputValidation(
                  "card_number",
                  card_number_error
                )}
              />
              {errors.card_number && (
                <Text style={styles.error}>
                  Please enter a valid card number (16 digits)
                </Text>
              )}
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
                      onEndEditing={handleInputValidation(
                        "month_exp",
                        month_exp_error
                      )}
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
                      onEndEditing={handleInputValidation(
                        "year_exp",
                        year_exp_error
                      )}
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
                      onEndEditing={handleInputValidation("cvc", cvc_error)}
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
                {(errors.month_exp || errors.year_exp) && (
                  <Text style={styles.error}>
                    Please enter a valid expiration date
                  </Text>
                )}
                {errors.cvc && (
                  <>
                    <View style={{ width: 10, height: 10 }} />
                    <Text style={styles.errorCvc}>
                      Please enter a valid CVC
                    </Text>
                  </>
                )}
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

  errorCvc: {
    color: "red",
    width: 90,
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
