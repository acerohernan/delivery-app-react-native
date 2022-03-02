import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../styles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import MenuItemNav from "../../components/menuItem/nav";
import MenuItemSection from "../../components/menuItem/section";
import { useAppDispatch, useAppSelector } from "../../redux";
import { addItem, removeItem } from "../../redux/reducers/cart";

/* Variables */
const screenHeight = Dimensions.get("screen").height;

export default function MenuItemScreen() {
  const [section, setSection] = useState(1);

  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  const { params } =
    useRoute<RouteProp<DashboardStackParamsList, "MenuItem">>();
  const { title, image, description, price, restaurantName } = params;
  const { items } = useAppSelector((state) => state.cart);

  const itemInCart = items.find((item) => item.title === title);

  const handleChangeSection = (sectionNumber: number) => {
    setSection(sectionNumber);
  };

  const handleAddToCart = () => {
    dispatch(addItem({ title, image, description, price, restaurantName }));
  };

  const handleRemoveToCart = () => {
    dispatch(removeItem({ title, image, description, price, restaurantName }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Material name="chevron-left" size={38} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
          </View>

          <View style={styles.details}>
            <View style={styles.rating}>
              <Material name="star" color="#fdda3a" size={25} />
              <Text style={styles.ratingTitle}>4.9</Text>
              <Text>(200)</Text>
            </View>
            <View style={styles.detailItem}>
              <Material name="clock-fast" color="#2E89BA" size={25} />
              <Text style={styles.detailTitle}>30 min</Text>
            </View>
            <View style={styles.detailItem}>
              <Material name="cash-multiple" color="green" size={25} />
              <Text style={styles.detailTitle}>Free Delivery</Text>
            </View>
          </View>
        </View>
        <MenuItemNav
          changeSection={handleChangeSection}
          selectedSection={section}
        />
        <MenuItemSection selectedSection={section} description={description} />
      </View>
      <View style={styles.footer}>
        {itemInCart && (
          <>
            <View style={styles.quantityButton}>
              <TouchableOpacity onPress={handleRemoveToCart}>
                <Material
                  name="minus-circle-outline"
                  size={28}
                  color={colors.orange}
                />
              </TouchableOpacity>
              <Text style={styles.quantityNumber}>{itemInCart.quantity}</Text>
              <TouchableOpacity onPress={handleAddToCart}>
                <Material
                  name="plus-circle-outline"
                  size={28}
                  color={colors.orange}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Cart")}
            >
              <Text style={styles.buttonText}>Go to Cart</Text>
            </TouchableOpacity>
          </>
        )}
        {!itemInCart && (
          <TouchableOpacity style={styles.buttonFull} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  backButton: {
    padding: 20,
    position: "absolute",
    top: 0,
  },
  body: {
    height: screenHeight - 420,
    paddingVertical: 20,
    backgroundColor: "white",
  },
  header: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.orange,
  },
  subtitle: {
    color: "gray",
    marginTop: 10,
  },
  rating: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  ratingTitle: {
    fontWeight: "bold",
    marginLeft: 3,
    marginRight: 3,
  },
  details: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 7,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTitle: {
    fontWeight: "200",
    marginLeft: 5,
    color: "gray",
  },

  footer: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  quantityButton: {
    width: "35%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.gray,
    padding: 15,
    borderRadius: 10,
  },
  quantityNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    width: "63%",
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonFull: {
    width: "100%",
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
