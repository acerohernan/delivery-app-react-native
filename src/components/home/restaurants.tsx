import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { IRestaurant } from "../../redux/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import { useRestaurantCategories } from "../../utils/useRestaurantCat";
import { colors } from "../../styles";
import { useAppSelector } from "../../redux";

//RestaurantPlaceholder
export const RestaurantPlaceholder = () => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      padding: 10,
      borderRadius: 20,
      backgroundColor: "white",
      marginBottom: 15,
      elevation: 1,
    },
    image: {
      width: "100%",
      height: 180,
      borderRadius: 20,
      backgroundColor: colors.gray,
    },
    text: {
      backgroundColor: colors.gray,
      width: "100%",
      height: 15,
      marginTop: 10,
      borderRadius: 20,
    },

    table: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
    },
    tableLabel: {
      width: 50,
      height: 15,
      backgroundColor: colors.gray,
      borderRadius: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.image} />
      <View style={styles.text} />
      <View style={styles.text} />
      <View style={styles.table}>
        <View style={styles.tableLabel} />
        <View style={styles.tableLabel} />
      </View>
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
  price,
  is_closed,
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
      onPress={() =>
        navigation.navigate("Restaurant", {
          name,
          image_url,
          categories,
          review_count,
          rating,
          price,
          is_closed,
        })
      }
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

//Main

interface RestaurantProps {
  items: Array<IRestaurant>;
}

export default function Restaurants({ items }: RestaurantProps) {
  const { status } = useAppSelector((state) => state.restaurant);

  if (status !== "getRestaurants_success") {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Restaurants</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <RestaurantPlaceholder key={e} />
          ))}
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Restaurants</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {items &&
          items.map((item) => <RestaurantCard key={item.id} {...item} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingBottom: 100,
    width: "100%",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
});
