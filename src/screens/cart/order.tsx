import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../styles";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/header";
import CartItems from "../../components/cart/items";
import CartSubtotal from "../../components/cart/subtotal";
import CartUbication from "../../components/cart/ubication";
import { useAppSelector } from "../../redux";

/* Variables */
const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

/* Components */

//ItemCart
const ItemCart = () => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 20,
      paddingBottom: 10,
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 10,
      marginRight: 20,
    },
    details: {
      width: screenWidth - 130,
      height: 70,
      flexDirection: "column",
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 3,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    price: {
      color: colors.orange,
      fontWeight: "bold",
      fontSize: 18,
    },
    quantityButton: {
      width: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      padding: 7,
      backgroundColor: colors.gray,
      borderRadius: 10,
    },
    quantityText: {
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require("../../images/burger.jpg")} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>Crispy Burguer</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>$30.00</Text>
          <View style={styles.quantityButton}>
            <TouchableOpacity>
              <Material name="minus" size={20} color="gray" />
            </TouchableOpacity>
            <Text style={styles.quantityText}> 2</Text>
            <TouchableOpacity>
              <Material name="plus" size={20} color={colors.orange} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

//Items
const Items = () => {
  return (
    <View>
      <ItemCart />
      <ItemCart />
    </View>
  );
};

//Subtotal
const Subtotal = () => {
  const styles = StyleSheet.create({
    container: { paddingBottom: 20 },
    table: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: colors.gray,
    },
    tableItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 5,
    },
    tableLabel: {
      fontSize: 16,
    },
    deliveryLabel: {
      color: colors.green,
      fontSize: 16,
    },
    totalContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 15,
      paddingBottom: 5,
      borderColor: colors.gray,
    },
    total: {
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableItem}>
          <Text style={styles.tableLabel}>Item Total</Text>
          <Text style={styles.tableLabel}>$50.00</Text>
        </View>
        <View style={styles.tableItem}>
          <Text style={styles.tableLabel}>Discount</Text>
          <Text style={styles.tableLabel}>$10.00</Text>
        </View>
        <View style={styles.tableItem}>
          <Text style={styles.deliveryLabel}>Delivery Fee</Text>
          <Text style={styles.deliveryLabel}>Free</Text>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>$70.00</Text>
      </View>
      <View style={styles.tableItem}>
        <Text style={styles.tableLabel}>Payment Method</Text>
        <Text style={styles.tableLabel}>Visa Card</Text>
      </View>
    </View>
  );
};

interface RoadItemProps {
  status: string;
  iconName?: string;
  last?: boolean;
  iconColor?: string;
  bgIconColor?: string;
}

//RoadmapItem
const RoadmapItem = ({
  status,
  last,
  iconColor,
  bgIconColor,
  iconName,
}: RoadItemProps) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    right: {},
    pointContainer: {
      flexDirection: "column",
      alignItems: "center",
      marginHorizontal: 20,
    },
    pointBar: {
      backgroundColor: colors.orangeLight,
      width: 5,
      height: 90,
    },
    point: {
      backgroundColor: colors.orange,
      width: 10,
      height: 10,
      borderRadius: 20,
    },
    left: {
      flexDirection: "column",
      alignItems: "center",
    },
    text: {
      fontSize: 14,
      color: "gray",
      marginBottom: 3,
    },
    icon: {
      backgroundColor: bgIconColor ? bgIconColor : colors.orangeLight,
      color: iconColor ? iconColor : colors.orange,
      padding: 5,
      borderRadius: 5,
      width: 40,
      textAlign: "center",
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
    },
    statusType: {
      color: iconColor ? iconColor : colors.orange,
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 3,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.text}>10 May, 2020</Text>
        <Text style={styles.text}>10:20 AM</Text>
      </View>
      <View style={styles.pointContainer}>
        <View style={styles.point} />
        {last ? null : <View style={styles.pointBar} />}
      </View>
      <View style={styles.right}>
        <Material
          name={iconName ? iconName : "food"}
          style={styles.icon}
          size={30}
        />
        <View style={styles.statusContainer}>
          <Text style={styles.text}>Status: </Text>
          <Text style={styles.statusType}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

//Roadmap
const RoadMap = () => {
  const styles = StyleSheet.create({
    container: {
      borderColor: colors.gray,
      borderBottomWidth: 1,
      paddingBottom: 20,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontSize: 15,
      color: "gray",
    },
    text: {
      fontSize: 15,
      color: "black",
      fontWeight: "bold",
    },
    itemsContainer: {
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Order ID: </Text>
        <Text style={styles.text}>1542015001</Text>
      </View>
      <View style={styles.itemsContainer}>
        <RoadmapItem status="Deliverred" iconName="moped" />
        <RoadmapItem
          status="On Thy Way"
          iconName="truck-fast-outline"
          iconColor="#3b3efd"
          bgIconColor="#d9e4fd"
        />
        <RoadmapItem
          status="Order Proccessing"
          iconName="clock-time-three-outline"
          iconColor="#D82148"
          bgIconColor="#ffe1e1"
        />
        <RoadmapItem
          status="Confirmed"
          iconName="check-circle-outline"
          iconColor="#008f4c"
          bgIconColor="#defcdb"
        />
        <RoadmapItem status="Order Placed" iconName="gift-outline" last />
      </View>
    </View>
  );
};

export default function OrderScreen() {
  const { restaurant } = useAppSelector((state) => state.cart);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Order Tracking" linkToHome />
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <RoadMap />
          <CartUbication />
          <View style={styles.itemContainer}>
            <View style={styles.itemTitleContainer}>
              <Text style={styles.itemTitle}>Order From</Text>
              <Text style={styles.itemRestaurant}>{restaurant}</Text>
            </View>
          </View>

          <CartItems checkout />
          <CartSubtotal order />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  body: {
    height: screenHeight - 140,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 25,
  },
  itemContainer: {},
  itemTitleContainer: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemRestaurant: {
    color: colors.orange,
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {},
});
