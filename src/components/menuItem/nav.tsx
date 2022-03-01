import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../styles";

//Variables
const navLinks = [
  {
    title: "Details",
    keyLink: 0,
  },
  {
    title: "Ingredients",
    keyLink: 1,
  },
  {
    title: "Review",
    keyLink: 2,
  },
];

//NavLink
interface NavLinkProps {
  active?: boolean;
  title: string;
  keyLink: number;
  changeSection: (section: number) => void;
}

const NavLink = ({ active, title, keyLink, changeSection }: NavLinkProps) => {
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
    <TouchableOpacity
      style={styles.container}
      onPress={() => changeSection(keyLink)}
    >
      <Text style={styles.link}>{title}</Text>
      {active ? <View style={styles.point} /> : null}
    </TouchableOpacity>
  );
};

interface NavProps {
  selectedSection: number;
  changeSection: (section: number) => void;
}

export default function MenuItemNav({
  changeSection,
  selectedSection,
}: NavProps) {
  return (
    <View style={styles.container}>
      {navLinks.map((link, index) => {
        if (link.keyLink === selectedSection) {
          return (
            <NavLink
              key={index}
              changeSection={changeSection}
              {...link}
              active
            />
          );
        }
        return <NavLink key={index} changeSection={changeSection} {...link} />;
      })}
    </View>
  );
}

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
