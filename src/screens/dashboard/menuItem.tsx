import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../styles";
import { ScreenWidth } from "react-native-elements/dist/helpers";

/* Variables */

const screenHeight = Dimensions.get("screen").height;

/* Components */

//NavLink

interface NavLinkProps {
  active?: boolean;
  title: string;
}

const NavLink = ({ active, title }: NavLinkProps) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
    },
    link: {
      fontSize: 15,
      fontWeight: active ? "bold" : "500",
      color: active ? colors.black : "gray",
    },

    point: {
      position: "absolute",
      left: "50%",
      bottom: -10,
      width: 7,
      height: 7,
      backgroundColor: "black",
      borderRadius: 10,
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.link}>{title}</Text>
      {active ? <View style={styles.point} /> : null}
    </TouchableOpacity>
  );
};

//RestaurantNav
const RestaurantNav = () => {
  const styles = StyleSheet.create({
    container: {
      borderColor: colors.gray,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      paddingVertical: 15,
      marginTop: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  });

  return (
    <View style={styles.container}>
      <NavLink title="Details" />
      <NavLink title="Burguer" />
      <NavLink title="Review" active />
    </View>
  );
};

//Main
export default function MenuItemScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require("../../images/burger.jpg")} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Chicken Burguer</Text>
            <Text style={styles.price}>$15.00</Text>
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

            {/* <Text style={styles.takeAway}>Required</Text> */}
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <RestaurantNav />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.quantityButton}>
          <TouchableOpacity>
            <Material
              name="minus-circle-outline"
              size={25}
              color={colors.orange}
            />
          </TouchableOpacity>
          <Text style={styles.quantityNumber}>2</Text>
          <TouchableOpacity>
            <Material
              name="plus-circle-outline"
              size={25}
              color={colors.orange}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
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

  takeAway: {
    padding: 10,
    color: colors.orange,
    backgroundColor: colors.orangeLight,
    borderRadius: 10,
    fontWeight: "bold",
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
  buttonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
