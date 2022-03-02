import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";

/* Variables */
const screenWidth = Dimensions.get("screen").width;

export default function CartUbication() {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  return (
    <View style={styles.container}>
      <Image source={require("../../images/map.png")} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Deliver to: Home</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Address")}
          >
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>13A Havinr Street, New York</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 20,
  },
  details: {
    width: screenWidth - 120,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  text: {
    color: "gray",
  },
  button: {},
  buttonText: {
    color: colors.orange,
    fontWeight: "bold",
    fontSize: 16,
  },
});
