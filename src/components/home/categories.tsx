import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { restaurantCategories } from "../../utils/data";

//Category
interface CategoryProps {
  name: string;
  key_name: string;
  image_src: any;
  changeCategory: any;
  active?: boolean;
}

const Category = ({
  name,
  key_name,
  image_src,
  changeCategory,
  active,
}: CategoryProps) => {
  const styles = StyleSheet.create({
    container: {
      width: 80,
    },
    title: {
      color: "white",
      textAlign: "center",
      fontWeight: active ? "bold" : "500",
      borderColor: "white",
      borderBottomWidth: active ? 2 : 0,
    },
    icon: {
      alignSelf: "center",
      width: 40,
      height: 40,
      resizeMode: "contain",
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => changeCategory(key_name)}
    >
      <Image source={image_src} style={styles.icon} />
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
};

//Categories
interface CategoriesProps {
  changeCategory: (category: string) => void;
  categorySelected: string;
}

export default function Categories({
  changeCategory,
  categorySelected,
}: CategoriesProps) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurantCategories.map((category, i) => {
          if (category.key_name === categorySelected) {
            return (
              <Category
                key={i}
                changeCategory={changeCategory}
                {...category}
                active
              />
            );
          }
          return (
            <Category key={i} changeCategory={changeCategory} {...category} />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    marginTop: 20,
  },
});
