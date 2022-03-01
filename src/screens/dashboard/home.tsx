import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import MainNav from "../../components/mainNav";

import { useAppDispatch, useAppSelector } from "../../redux";
import { getRestaurants } from "../../redux/reducers/restaurant";
import { IRestaurant } from "../../redux/models";
import { useRestaurantCategories } from "../../utils/useRestaurantCat";

/* Variables */
const categories = [
  {
    name: "American",
    key_name: "American (New)",
    image_src: require("../../images/categories/american.png"),
  },
  {
    name: "Pizza",
    key_name: "Pizza",
    image_src: require("../../images/categories/pizza.png"),
  },
  {
    name: "Korean",
    key_name: "Korean",
    image_src: require("../../images/categories/korean.png"),
  },
  {
    name: "French",
    key_name: "French",
    image_src: require("../../images/categories/frech.png"),
  },
  {
    name: "Latin",
    key_name: "Latin American",
    image_src: require("../../images/categories/latin.png"),
  },
  {
    name: "Small",
    key_name: "Tapas/Small Plates",
    image_src: require("../../images/categories/tapas.png"),
  },
  {
    name: "Gastropubs",
    key_name: "Gastropubs",
    image_src: require("../../images/categories/gastropubs.png"),
  },
  {
    name: "Wine",
    key_name: "Wine Bars",
    image_src: require("../../images/categories/wine.png"),
  },
];

/* Components */

//Category
interface CategoryProps {
  name: string;
  key_name: string;
  image_src: any;
  changeCategory: any;
  active?: boolean;
}

const Category = ({
  name,
  key_name,
  image_src,
  changeCategory,
  active,
}: CategoryProps) => {
  const styles = StyleSheet.create({
    container: {
      width: 80,
    },
    title: {
      color: "white",
      textAlign: "center",
      fontWeight: active ? "bold" : "500",
      borderColor: "white",
      borderBottomWidth: active ? 2 : 0,
    },
    icon: {
      alignSelf: "center",
      width: 40,
      height: 40,
      resizeMode: "contain",
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => changeCategory(key_name)}
    >
      <Image source={image_src} style={styles.icon} />
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
};

//Categories

interface CategoriesProps {
  changeCategory: (category: string) => void;
  categorySelected: string;
}

const Categories = ({ changeCategory, categorySelected }: CategoriesProps) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      height: 70,
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, i) => {
          if (category.key_name === categorySelected) {
            return (
              <Category
                key={i}
                changeCategory={changeCategory}
                {...category}
                active
              />
            );
          }
          return (
            <Category key={i} changeCategory={changeCategory} {...category} />
          );
        })}
      </ScrollView>
    </View>
  );
};

//RestaurantCard
const RestaurantCard = ({
  name,
  image_url,
  categories,
  review_count,
  rating,
}: IRestaurant) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

  const parsedCategories = useRestaurantCategories(categories);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      padding: 10,
      borderRadius: 20,
      backgroundColor: "white",
      marginBottom: 15,
    },
    image: {
      width: "100%",
      height: 180,
      resizeMode: "cover",
      borderRadius: 20,
    },
    title: {
      fontWeight: "bold",
      fontSize: 16,
      marginTop: 5,
    },
    categories: {
      color: "gray",
      fontSize: 13,
      marginTop: 5,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },
    rating: {
      flexDirection: "row",
    },
    time: {
      backgroundColor: colors.orangeLight,
      padding: 7,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    timeText: { color: colors.orange, fontWeight: "bold", fontSize: 12 },
    timeIcon: {
      marginRight: 5,
      color: colors.orange,
    },
    elevation: {
      elevation: 1,
    },
    shadowProp: {
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.container, styles.elevation, styles.shadowProp]}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("Restaurant")}
    >
      <Image source={{ uri: image_url }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.categories}>{parsedCategories}</Text>
      <View style={styles.footer}>
        <View style={styles.rating}>
          <Material name="star" size={20} color="#fdda3a" />
          <Text style={styles.rating}>
            {rating} ({review_count})
          </Text>
        </View>
        <View style={styles.time}>
          <Material name="clock-outline" size={15} style={styles.timeIcon} />
          <Text style={styles.timeText}>20 min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

//Restaurants
interface RestaurantsProps {
  items: Array<IRestaurant>;
}

const Restaurants = ({ items }: RestaurantsProps) => {
  const styles = StyleSheet.create({
    container: {
      marginTop: 50,
    },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Restaurants</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {items &&
          items.map((item) => <RestaurantCard key={item.id} {...item} />)}
      </ScrollView>
    </View>
  );
};

//Main
export default function HomeScreen() {
  const [category, setCategory] = useState("");
  const [itemsByCategory, setItemsByCategory] = useState<Array<IRestaurant>>(
    []
  );

  const { items } = useAppSelector((state) => state.restaurant);
  const dispatch = useAppDispatch();

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
          <Text style={styles.addressText}>Delivery to</Text>
          <Text style={styles.addressTitle}>HOME</Text>
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
    width: 150,
    flexDirection: "row",
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
