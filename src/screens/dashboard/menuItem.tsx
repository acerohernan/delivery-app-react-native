import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../styles";

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

//ItemNav
const ItemNav = () => {
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
      <NavLink title="Ingredients" active />
      <NavLink title="Review" />
    </View>
  );
};

//ItemSection
const ItemSection = () => {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
    },
    required: {
      padding: 10,
      color: colors.orange,
      backgroundColor: colors.orangeLight,
      borderRadius: 10,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choise of top burguer</Text>
        <Text style={styles.required}>Required</Text>
      </View>
      <View>
        <View>
          <BouncyCheckboxGroup
            data={[
              {
                id: 0,
                text: "Extra Savory Sauce",
                style: {
                  marginBottom: 5,
                },
              },
              {
                id: 1,
                text: "Extra Cheese",
                style: {
                  marginBottom: 5,
                },
              },
              {
                id: 2,
                text: "Extra Tomatoes",
                style: {
                  marginBottom: 5,
                },
              },
            ]}
            onChange={(e: ICheckboxButton) => console.log(e)}
            style={{ flexDirection: "column" }}
          />
        </View>
      </View>
    </View>
  );
};

//Main
export default function MenuItemScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Image
          source={require("../../images/burger.jpg")}
          style={styles.image}
        />
        <TouchableOpacity style={styles.backButton}>
          <Material name="chevron-left" size={38} color="white" />
        </TouchableOpacity>
      </View>
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
          </View>
        </View>
        <ItemNav />
        <ItemSection />
      </View>
      <View style={styles.footer}>
        <View style={styles.quantityButton}>
          <TouchableOpacity>
            <Material
              name="minus-circle-outline"
              size={28}
              color={colors.orange}
            />
          </TouchableOpacity>
          <Text style={styles.quantityNumber}>2</Text>
          <TouchableOpacity>
            <Material
              name="plus-circle-outline"
              size={28}
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
  buttonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
