import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../styles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { useRestaurantCategories } from "../../utils/useRestaurantCat";
import RestaurantNav from "../../components/restaurant/nav";
import RestaurantMenu from "../../components/restaurant/menu";

/* Variables */
const screenHeight = Dimensions.get("screen").height;

export default function RestaurantScreen() {
  const [menuCategory, setMenuCategory] = useState("For You");

  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  const { params } =
    useRoute<RouteProp<DashboardStackParamsList, "Restaurant">>();
  const { name, image_url, categories, price, review_count, rating } = params;
  const parsedCategories = useRestaurantCategories(categories);

  const handleChangeMenuCategory = (category: string) => {
    setMenuCategory(category);
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Image source={{ uri: image_url }} style={styles.image} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Material name="chevron-left" size={38} color="white" />
        </TouchableOpacity>
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>
              {price} • {parsedCategories}
            </Text>
            <View style={styles.rating}>
              <Material name="star" color="#fdda3a" size={25} />
              <Text style={styles.ratingTitle}>{rating}</Text>
              <Text>{review_count}+ Ratings</Text>
            </View>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Material name="cash-multiple" color="green" size={25} />
                <Text style={styles.detailTitle}>Free Delivery</Text>
              </View>
              <View style={styles.detailItem}>
                <Material name="clock-fast" color="#2E89BA" size={25} />
                <Text style={styles.detailTitle}>30 min</Text>
              </View>
              <Text style={styles.takeAway}>Take Away</Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RestaurantNav
              changeCategory={handleChangeMenuCategory}
              selectedCategory={menuCategory}
            />
            <RestaurantMenu
              selectedCategory={menuCategory}
              restaurantName={name}
            />
          </ScrollView>
        </View>
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
    height: screenHeight - 300,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: -25,
    backgroundColor: "white",
  },
  header: {
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
  },
  subtitle: {
    color: "gray",
    marginTop: 10,
  },
  rating: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingTitle: {
    fontWeight: "bold",
    marginLeft: 3,
    marginRight: 10,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 7,
    paddingBottom: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTitle: {
    fontWeight: "200",
    marginLeft: 5,
  },

  takeAway: {
    padding: 10,
    color: colors.orange,
    backgroundColor: colors.orangeLight,
    borderRadius: 10,
    fontWeight: "bold",
  },
});
