import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";

export default function MethodScreen() {
  return (
    <SafeAreaView>
      <Header title="Add a Payment Method" />
      <View>
        <Text>MethodScreen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  body: {},
  footer: {},
});
