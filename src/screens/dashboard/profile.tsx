import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title="Profile" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
