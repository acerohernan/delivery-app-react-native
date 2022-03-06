import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Restaurants from "../../components/home/restaurants";
import { IRestaurant } from "../../redux/models";
import { useAppDispatch, useAppSelector } from "../../redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { getRestaurants } from "../../redux/reducers/restaurant";
import { useRestaurantCategories } from "../../utils/useRestaurantCat";
import { StatusBar } from "expo-status-bar";
import MainNav from "../../components/mainNav";
import Categories from "../../components/home/categories";

/* Variables */
const screenHeight = Dimensions.get("screen").height;

export default function HomeScreen2() {
  const { status, items } = useAppSelector((state) => state.restaurant);
  const { items: addressItems, selectedAddress } = useAppSelector(
    (state) => state.address
  );

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [restaurantItems, setRestaurantItems] = useState<Array<IRestaurant>>(
    []
  );

  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  const handleChangeCategory = (categoryName: string) => {
    if (category === categoryName) return setCategory("");
    setCategory(categoryName);
    setSearchValue("");
  };

  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  useEffect(() => {
    if (status === "getRestaurants_success") setRestaurantItems(items);
  }, [status]);

  useEffect(() => {
    if (items.length > 0 && category !== "") {
      const filteredItems = items.filter((item) =>
        useRestaurantCategories(item.categories).includes(category)
      );
      setRestaurantItems(filteredItems);
    }

    if (category === "") setRestaurantItems(items);
  }, [category, items]);

  useEffect(() => {
    if (searchValue !== "" && category === "") {
      const filteredItems = restaurantItems.filter((item) =>
        item.name
          .toLocaleLowerCase()
          .split(" ")
          .join("")
          .includes(searchValue.toLocaleLowerCase().split(" ").join(""))
      );
      setRestaurantItems(filteredItems);
    }

    if (searchValue !== "" && category !== "") {
      const filteredItems = restaurantItems.filter((item) =>
        item.name
          .toLocaleLowerCase()
          .split(" ")
          .join("")
          .includes(searchValue.toLocaleLowerCase().split(" ").join(""))
      );

      const filteredByCategory = filteredItems.filter((item) =>
        useRestaurantCategories(item.categories).includes(category)
      );

      setRestaurantItems(filteredByCategory);
    }

    if (searchValue === "" && category !== "") {
      const filteredByCategory = items.filter((item) =>
        useRestaurantCategories(item.categories).includes(category)
      );

      setRestaurantItems(filteredByCategory);
    }

    if (searchValue === "" && category === "") {
      setRestaurantItems(items);
    }
  }, [searchValue]);

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <MainNav />
      <View style={styles.circle} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.addressContainer}>
            <TouchableOpacity style={styles.addressButton}>
              <Material name="map-marker-outline" size={22} color="white" />
              {addressItems && selectedAddress.name_tag ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Address")}
                  style={{ flexDirection: "row" }}
                >
                  <Text style={styles.addressText}>Delivery to</Text>
                  <Text style={styles.addressTitle}>
                    {selectedAddress.name_tag}
                  </Text>
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
              <Material name="bell-outline" size={27} color={colors.green} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              placeholder="Search.."
              style={styles.inputSearch}
              value={searchValue}
              onChangeText={(text) => setSearchValue(text)}
            />
            <Material
              name="magnify"
              size={30}
              color="gray"
              style={styles.inputIconSearch}
            />
            {searchValue !== "" && (
              <TouchableOpacity
                style={styles.inputIconClose}
                onPress={() => setSearchValue("")}
              >
                <Material name="close" size={18} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <Categories
            changeCategory={handleChangeCategory}
            categorySelected={category}
          />
        </View>
        <View style={styles.body}>
          {searchValue !== "" && restaurantItems.length === 0 ? (
            <View style={styles.notFound}>
              <Image
                source={require("../../images/icons/not-found.png")}
                style={styles.notFoundImg}
              />
              <Text style={styles.notFoundText}>
                Oops! We not found the restaurant that you search. Please try
                again later.
              </Text>
            </View>
          ) : (
            <Restaurants items={restaurantItems} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  circle: {
    width: 1400,
    height: 1400,
    position: "absolute",
    top: -1130,
    right: -500,
    backgroundColor: colors.green,
    borderRadius: 1400 / 2,
  },
  header: {
    paddingTop: 10,
    height: 200,
    paddingHorizontal: 20,
  },
  body: {
    height: screenHeight - 280,
    paddingHorizontal: 20,
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
  inputSearch: {
    backgroundColor: "white",
    color: "gray",
    padding: 13,
    paddingLeft: 50,
    borderRadius: 10,
  },

  inputIconSearch: {
    position: "absolute",
    top: 12,
    left: 12,
  },
  inputIconClose: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#Eee",
    padding: 5,
    borderRadius: 20,
  },
  footer: {
    backgroundColor: "cyan",
  },

  notFound: {
    width: "100%",
    alignItems: "center",
    marginTop: 60,
  },
  notFoundImg: {
    width: 180,
    height: 100,
    resizeMode: "contain",
  },
  notFoundText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
  },
});
