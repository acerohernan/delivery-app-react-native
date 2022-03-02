import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../types/navigation";
import { useAppSelector } from "../redux";

interface Props {
  title: string;
  linkToHome?: boolean;
}

export default function Header({ title, linkToHome }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  if (linkToHome) {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Material name="chevron-left" size={40} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Material name="bell-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.goBack()}
      >
        <Material name="chevron-left" size={40} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.headerButton}>
        <Material name="bell-outline" size={30} color="white" />
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
