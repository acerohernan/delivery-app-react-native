import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../styles";

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

export default function OrderRoadmap() {
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
}

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
