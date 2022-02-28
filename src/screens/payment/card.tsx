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
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import { colors } from "../../styles";

/* Variables */
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

/* Components */

//Main
export default function CreditCardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />;
      <Header title="My Cards" />
      <View style={styles.body}>
        <ScrollView>
          <Image
            source={require("../../images/card.png")}
            style={styles.image}
          />
          <View style={styles.form}>
            <KeyboardAvoidingView>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>CARDHOLDER NAME</Text>
                <TextInput style={styles.input} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>CARD NUMBER</Text>
                <View style={styles.someInputContainer}>
                  <TextInput style={styles.cardNumberInput} />
                  <TextInput style={styles.cardNumberInput} />
                  <TextInput style={styles.cardNumberInput} />
                  <TextInput style={styles.cardNumberInput} />
                </View>
              </View>
              <View style={styles.expiration}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>EXPIRATION DATE</Text>
                  <View style={styles.someInputContainer}>
                    <TextInput
                      style={styles.expirationInput}
                      placeholder="Month"
                    />
                    <Text style={{ marginRight: 10, fontSize: 26 }}>/</Text>
                    <TextInput
                      style={styles.expirationInput}
                      placeholder="Year"
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>CVV/CVC</Text>
                  <View style={styles.someInputContainer}>
                    <TextInput style={styles.expirationInput} />
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
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
    fontWeight: "bold",
    borderRadius: 10,
    textAlign: "center",
    marginRight: 10,
  },

  expiration: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
