import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import { colors } from "../../styles";

/* Variables */
const screenHeight = Dimensions.get("screen").height;

/* Components */

//Main
export default function MethodScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />;
      <Header title="Add a Payment Method" />
      <View style={styles.body}>
        <Text style={styles.title}>Choose payment method to add</Text>
        <View style={styles.methods}>
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.buttonImage}
              source={require("../../images/icons/paypal.png")}
            />
            <View>
              <Text style={styles.buttonTitle}>Paypal</Text>
              <Text style={styles.buttonText}>
                Faster and safer way to send money
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.buttonImage}
              source={require("../../images/icons/card.png")}
            />
            <View>
              <Text style={styles.buttonTitle}>Credit Card</Text>
              <Text style={styles.buttonText}>
                Faster and safer way to send money
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>Next</Text>
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
  title: {
    color: "#c2C2CB",
    fontSize: 16,
    fontWeight: "bold",
  },
  methods: {
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  buttonImage: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonText: {
    marginTop: 3,
    color: "#aaaab5",
    fontSize: 12,
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
