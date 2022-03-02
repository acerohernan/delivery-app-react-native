import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../types/navigation";
import { useAppSelector } from "../redux";
import { colors } from "../styles";

interface Props {
  title: string;
  linkToHome?: boolean;
  greenBg?: boolean;
}

export default function Header({ title, linkToHome, greenBg }: Props) {
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
        <Material
          name="chevron-left"
          size={40}
          color={greenBg ? "white" : "black"}
        />
      </TouchableOpacity>
      <Text style={greenBg ? styles.titleWhite : styles.title}>{title}</Text>
      <TouchableOpacity style={styles.headerButton}>
        <Material
          name="bell-outline"
          size={30}
          color={greenBg ? colors.green : "white"}
        />
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
    zIndex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  titleWhite: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  headerButton: {
    padding: 10,
  },
});
