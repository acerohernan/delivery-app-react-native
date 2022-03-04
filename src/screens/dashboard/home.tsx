import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";

import MainNav from "../../components/mainNav";
import Categories from "../../components/home/categories";
import Restaurants from "../../components/home/restaurants";

import { useAppDispatch, useAppSelector } from "../../redux";
import { getRestaurants } from "../../redux/reducers/restaurant";
import { IRestaurant } from "../../redux/models";
import { useRestaurantCategories } from "../../utils/useRestaurantCat";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";

export default function HomeScreen() {
  const [category, setCategory] = useState("");
  const [itemsByCategory, setItemsByCategory] = useState<Array<IRestaurant>>(
    []
  );

  const { items } = useAppSelector((state) => state.restaurant);
  const { items: addressItems, selectedAddress } = useAppSelector(
    (state) => state.address
  );
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  const handleChangeCategory = (categoryName: string) => {
    if (category === categoryName) return setCategory("");
    setCategory(categoryName);
  };

  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  useEffect(() => {
    if (items.length > 1 && category !== "") {
      const filteredItems = items.filter((item) =>
        useRestaurantCategories(item.categories).includes(category)
      );
      setItemsByCategory(filteredItems);
    }
  }, [category, items]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <MainNav />
      <View style={styles.circle} />
      <View style={styles.addressContainer}>
        <TouchableOpacity style={styles.addressButton}>
          <Material name="map-marker-outline" size={22} color="white" />
          {addressItems && selectedAddress.name_tag ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Address")}
              style={{ flexDirection: "row" }}
            >
              <Text style={styles.addressText}>Delivery to</Text>
              <Text style={styles.addressTitle}>HOME</Text>
            </TouchableOpacity>
          ) : null}

          {!addressItems || !selectedAddress.name_tag ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Address")}
              style={{ flexDirection: "row" }}
            >
              <Text style={styles.addressText}>Please add an</Text>
              <Text style={styles.addressTitle}>Address</Text>
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity>
          <Material name="bell-outline" size={27} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput placeholder="Search.." style={styles.input} />
        <Material
          name="magnify"
          size={30}
          color="gray"
          style={styles.inputIcon}
        />
      </View>
      <Categories
        changeCategory={handleChangeCategory}
        categorySelected={category}
      />
      <Restaurants items={category ? itemsByCategory : items} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  circle: {
    width: 1400,
    height: 1400,
    position: "absolute",
    top: -1130,
    right: -500,
    backgroundColor: colors.green,
    borderRadius: 1400 / 2,
  },
  navigation: {
    backgroundColor: "red",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },

  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  addressButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  addressText: {
    color: "white",
    marginHorizontal: 5,
  },

  addressTitle: {
    color: colors.orange,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "white",
    color: "gray",
    padding: 13,
    paddingLeft: 50,
    borderRadius: 10,
  },

  inputIcon: {
    position: "absolute",
    top: 12,
    left: 12,
  },

  footer: {
    backgroundColor: "cyan",
  },
});
