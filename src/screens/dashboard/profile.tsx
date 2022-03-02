import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import MainNav from "../../components/mainNav";
import AutocompleteInput from "../../components/autocompleteInput";

/* Variables */
const screenHeight = Dimensions.get("screen").height;

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Profile" />
      <View style={styles.body}>
        <MainNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    flex: 1,
    height: screenHeight - 148,
    backgroundColor: "white",
  },
});
