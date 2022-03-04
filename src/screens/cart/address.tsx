import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";
import { colors } from "../../styles";
import { useAppDispatch, useAppSelector } from "../../redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { IAddress } from "../../redux/models/address";
import { removeAddress, selectAddress } from "../../redux/reducers/address";

/* Variables */
const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

/* Components */
const AddressItem = ({ name_tag, address }: IAddress) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();
  const dispatch = useAppDispatch();

  const handleRemoveAddress = () => {
    dispatch(removeAddress({ name_tag, address }));
  };

  const handleSelectAddress = () => {
    dispatch(selectAddress({ name_tag, address }));
    navigation.goBack();
  };

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

  return (
    <TouchableOpacity style={styles.container} onPress={handleSelectAddress}>
      <Image source={require("../../images/map.png")} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name_tag}</Text>
          <TouchableOpacity style={styles.button} onPress={handleRemoveAddress}>
            <Material name="delete-outline" size={22} color={colors.orange} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

//Main
export default function AddressScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();
  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.address);

  const noAddress = items.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Addresses" />
      <View style={styles.body}>
        <Text style={styles.title}>
          {noAddress
            ? "Please create a new address"
            : "Choose one address to add or create"}
        </Text>

        <View>
          {items &&
            items.map((item, index) => <AddressItem key={index} {...item} />)}
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("NewAddress")}
        >
          <Text style={styles.footerText}>New Address</Text>
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
