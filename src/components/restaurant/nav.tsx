import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { colors } from "../../styles";
import { menuCategories } from "../../utils/data";

//NavLink
interface NavLinkProps {
  active?: boolean;
  name: string;
  keyName: string;
  changeCategory: (category: string) => void;
}

const NavLink = ({ active, name, keyName, changeCategory }: NavLinkProps) => {
  const styles = StyleSheet.create({
    container: {},
    link: {
      fontSize: 15,
      fontWeight: active ? "bold" : "500",
      color: active ? colors.black : "gray",
      marginRight: 25,
    },
  });

  return (
    <TouchableOpacity onPress={() => changeCategory(keyName)}>
      <Text style={styles.link}>{name}</Text>
    </TouchableOpacity>
  );
};

//RestaurantNav
interface RestaurantNavProps {
  selectedCategory: string;
  changeCategory: (category: string) => void;
}

export default function RestaurantNav({
  selectedCategory,
  changeCategory,
}: RestaurantNavProps) {
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {menuCategories.map((category, index) => {
          if (selectedCategory === category.keyName)
            return (
              <NavLink
                key={index}
                changeCategory={changeCategory}
                {...category}
                active
              />
            );

          return (
            <NavLink
              key={index}
              changeCategory={changeCategory}
              {...category}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.orangeLight,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingVertical: 20,
    paddingLeft: 25,
    marginLeft: 20,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
