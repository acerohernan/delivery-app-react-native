import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../types/navigation";
import { useAppDispatch } from "../redux";
import { disabledOnboard } from "../redux/reducers/user";

/* Variables */

const screens = [
  {
    title: "Discover places near you",
    description:
      "We make it simple to find the food you crave.enter your addess and let us do reset.",
    image: "",
  },
  {
    title: "Order your favorite",
    description:
      "When you order eat street, we will hook you up with exclusive coupns, speccial and rewards.",
    image: "",
  },
  {
    title: "Fastest Delivery",
    description:
      "We make foodo ordering fast, simple and free, no mmatter if your order online or cash.",
    image: "",
  },
];

/* Components */

//Button

interface ButtonProps {
  title?: string;
  bgColor?: string;
  fontColor?: string;
  onPress?: () => void;
}

const Button = ({
  title = "Button",
  bgColor = "black",
  fontColor = "white",
  onPress,
}: ButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      borderRadius: 50,
      width: 80,
      height: 80,
      backgroundColor: bgColor,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: fontColor,
      fontWeight: "bold",
      fontSize: 15,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

//Navigation

interface NavigationProps {
  actualScreen: number;
  changeActualScreen: (screen: number) => void;
}

const Navigation = ({ actualScreen, changeActualScreen }: NavigationProps) => {
  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      flexDirection: "row",
      width: 45,
      justifyContent: "space-between",
    },
    item: {
      width: 12,
      height: 6,
      backgroundColor: colors.gray,
      borderRadius: 10,
    },
    itemActive: {
      width: 12,
      height: 6,
      backgroundColor: colors.green,
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      {screens.map((i, index) => {
        if (index === actualScreen) {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => changeActualScreen(index)}
            >
              <View style={styles.itemActive}></View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={() => changeActualScreen(index)}
          >
            <View style={styles.item}></View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

//Main

export default function OnboardScreen() {
  const [screen, setScreen] = useState(0);

  const { title, description } = screens[screen];

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.body}>
        {screen === 0 && (
          <Image
            source={require(`../images/onboard/0.png`)}
            style={styles.image}
          />
        )}

        {screen === 1 && (
          <Image
            source={require(`../images/onboard/1.png`)}
            style={styles.image}
          />
        )}

        {screen === 2 && (
          <Image
            source={require(`../images/onboard/2.png`)}
            style={styles.image}
          />
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Navigation
          actualScreen={screen}
          changeActualScreen={(screen: number) => setScreen(screen)}
        />
      </View>
      <View style={styles.footer}>
        {screen < 2 && (
          <>
            <Button
              title="SKIP"
              bgColor="white"
              fontColor={colors.gray}
              onPress={() => setScreen(2)}
            />
            <Button
              title="NEXT"
              bgColor={colors.gray}
              fontColor={colors.black}
              onPress={() => setScreen(screen + 1)}
            />
          </>
        )}
        {screen === 2 && (
          <View style={styles.getStartedContainer}>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => dispatch(disabledOnboard())}
            >
              <Text style={styles.getStartedTitle}>Get Started</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: colors.black,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: colors.black,
    width: 300,
    lineHeight: 25,
  },
  footer: {
    flex: 1.3,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  getStartedContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  getStartedButton: {
    backgroundColor: colors.green,
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  getStartedTitle: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 16,
  },
});
