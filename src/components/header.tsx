import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton}>
        <Material name="chevron-left" size={40} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.headerButton}>
        <Material name="bell-outline" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerButton: {
    padding: 10,
  },
});
