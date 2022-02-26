import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { colors } from "../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamsList } from "../../types/navigation";
import MainNav from "../../components/mainNav";

/* Components */

//Category
interface CategoryProps {
  title: string;
}

const Category = ({ title }: CategoryProps) => {
  const styles = StyleSheet.create({
    container: {
      width: 80,
    },
    title: {
      color: "white",
      textAlign: "center",
    },
    icon: {
      alignSelf: "center",
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <Material name="food" size={40} color="white" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

//Categories
const Categories = () => {
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
        <Category title="Breackfast" />
        <Category title="Burguer" />
        <Category title="Pizza" />
        <Category title="Coffee" />
        <Category title="Pizza" />
        <Category title="Burguer" />
        <Category title="Pizza" />
      </ScrollView>
    </View>
  );
};

//RestaurantCard
const RestaurantCard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamsList>>();

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
      <Image
        source={require("../../images/restaurant.jpg")}
        style={styles.image}
      />
      <Text style={styles.title}>Burguer King</Text>
      <Text style={styles.categories}>
        Burguer • American Food • Deshi Food
      </Text>
      <View style={styles.footer}>
        <View style={styles.rating}>
          <Material name="star" size={20} color="#fdda3a" />
          <Text style={styles.rating}>4.9 (150)</Text>
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
const Restaurants = () => {
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
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </ScrollView>
    </View>
  );
};

//Main
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <MainNav />
      <StatusBar style="auto" />
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
      <Categories />
      <Restaurants />
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
