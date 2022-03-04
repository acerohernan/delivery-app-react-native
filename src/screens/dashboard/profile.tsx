import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import MainNav from "../../components/mainNav";
import { colors } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { useAppSelector } from "../../redux";

/* Variables */
const screenHeight = Dimensions.get("screen").height;

export default function ProfileScreen() {
  const { username } = useAppSelector((state) => state.user);

  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Profile" greenBg />
      <View style={styles.body}>
        <View style={styles.circle} />
        <MainNav />
        <TouchableOpacity>
          <Image
            source={require("../../images/user.png")}
            style={styles.imageButton}
          />
        </TouchableOpacity>
        <Text style={styles.username}>@{username}</Text>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => navigation.navigate("Address")}
          >
            <View style={styles.optionMain}>
              <Material name="map-marker-outline" size={27} color="gray" />
              <Text style={styles.optionText}>Edit your address</Text>
            </View>
            <Material name="chevron-right" size={25} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => navigation.navigate("PaymentMethod")}
          >
            <View style={styles.optionMain}>
              <Material name="credit-card-outline" size={27} color="gray" />
              <Text style={styles.optionText}>Edit your payment method</Text>
            </View>
            <Material name="chevron-right" size={25} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  body: {
    flex: 1,
    height: screenHeight - 148,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  circle: {
    width: 1400,
    height: 1400,
    position: "absolute",
    top: -1250,
    right: -510,
    backgroundColor: colors.green,
    borderRadius: 1400 / 2,
    zIndex: -1,
  },
  imageButton: {
    width: 150,
    height: 150,
    borderRadius: 300,
    marginTop: 60,
    resizeMode: "cover",
    borderColor: "rgba(177, 176, 176, 0.549)",
    borderWidth: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
    color: "black",
    textAlign: "center",
  },
  options: {
    width: "100%",
    marginTop: 30,
    borderColor: "#eee",
    borderBottomWidth: 1,
  },
  optionItem: {
    padding: 20,
    borderColor: "#eee",
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 15,
    marginLeft: 10,
    color: "gray",
  },
});
