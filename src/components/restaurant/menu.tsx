import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { colors } from "../../styles";
import { menuItems } from "../../utils/data";
import { useAppDispatch } from "../../redux";
import { addItem } from "../../redux/reducers/cart";

//Variables
const screenWidth = Dimensions.get("screen").width;

//MenuItem
interface MenuItemProps {
  title: string;
  description: string;
  price: string;
  image: string;
  restaurantName: string;
}

const MenuItem = ({
  title,
  description,
  price,
  image,
  restaurantName,
}: MenuItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ title, description, price, image, restaurantName }));
    navigation.navigate("MenuItem", {
      title,
      description,
      price,
      image,
      restaurantName,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderRadius: 15,
      marginBottom: 10,
      backgroundColor: "white",
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: "cover",
      borderRadius: 10,
      marginRight: 15,
    },
    details: {
      width: screenWidth - 175,
    },
    title: {
      fontWeight: "bold",
      fontSize: 22,
      marginBottom: 5,
    },
    text: {
      fontSize: 13,
      color: "gray",
    },
    price: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    priceText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.orange,
    },
    addButton: {
      height: 22,
      width: 22,
      backgroundColor: colors.orange,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
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
      onPress={() =>
        navigation.navigate("MenuItem", {
          title,
          description,
          price,
          image,
          restaurantName,
        })
      }
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <View style={styles.price}>
          <Text style={styles.priceText}>{price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Material name="plus" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

//Menu
interface MenuProps {
  selectedCategory: string;
  restaurantName: string;
}

export default function RestaurantMenu({
  selectedCategory,
  restaurantName,
}: MenuProps) {
  const [items, setItems] = useState(menuItems);

  useEffect(() => {
    if (selectedCategory === "For You") return setItems(menuItems);

    const itemsByCategory = menuItems.filter((item) =>
      item.title.includes(selectedCategory)
    );
    setItems(itemsByCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <MenuItem key={index} {...item} restaurantName={restaurantName} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
});
