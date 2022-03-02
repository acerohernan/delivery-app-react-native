import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../styles";
import { useAppDispatch } from "../../redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { createAddress } from "../../redux/reducers/address";
import Header from "../../components/header";
import Input from "../../components/input";

/* Variables */
const screenHeight = Dimensions.get("screen").height;

interface FormValues {
  name_tag: string;
  address: string;
}

//Main
export default function NewAddressScreen() {
  const [inputValues, setInputValues] = useState<FormValues>({
    name_tag: "",
    address: "",
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();
  const dispatch = useAppDispatch();

  const handleAddAddress = () => {
    dispatch(
      createAddress({
        ...inputValues,
      })
    );
    navigation.navigate("Address");
  };

  const handleInputChange = (name: string, text: string) => {
    setInputValues({ ...inputValues, [name]: text });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="New Address" />
      <View style={styles.body}>
        <Text style={styles.title}>
          Write the information about your Address
        </Text>
        <View style={styles.form}>
          <Input
            placeholder="Name Tag"
            iconName="home-edit-outline"
            onChangeText={handleInputChange}
            name="name_tag"
            maxLength={12}
            autoFocus
          />
          <Input
            placeholder="Address"
            iconName="map-marker-outline"
            name="address"
            onChangeText={handleInputChange}
            maxLength={40}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleAddAddress}
        >
          <Text style={styles.footerText}>Add</Text>
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

  form: {},

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
