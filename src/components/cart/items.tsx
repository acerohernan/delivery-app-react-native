import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../styles";
import { useAppDispatch, useAppSelector } from "../../redux";
import { IMenuItem } from "../../redux/models/cart";
import { addItem, removeItem } from "../../redux/reducers/cart";

/* Variables */
const screenWidth = Dimensions.get("screen").width;

//ItemCart
interface ItemCartProps extends IMenuItem {
  checkout?: boolean;
}

const ItemCart = ({
  title,
  description,
  image,
  quantity,
  price,
  checkout,
}: ItemCartProps) => {
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((state) => state.cart);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        title,
        description,
        image,
        quantity,
        price,
        restaurantName: restaurant,
      })
    );
  };

  const handleRemoveToCart = () => {
    dispatch(
      removeItem({
        title,
        description,
        image,
        quantity,
        price,
        restaurantName: restaurant,
      })
    );
  };

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
    quantityCheckout: {
      backgroundColor: colors.gray,
      borderRadius: 20,
      padding: 7,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
          {!checkout && (
            <View style={styles.quantityButton}>
              <TouchableOpacity onPress={handleRemoveToCart}>
                <Material name="minus" size={20} color="gray" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={handleAddToCart}>
                <Material name="plus" size={20} color={colors.orange} />
              </TouchableOpacity>
            </View>
          )}
          {checkout && <Text style={styles.quantityCheckout}>{quantity}</Text>}
        </View>
      </View>
    </View>
  );
};

interface CartItemsProps {
  checkout?: boolean;
  order?: boolean;
}

export default function CartItems({ checkout, order }: CartItemsProps) {
  const { items, orderItems } = useAppSelector((state) => state.cart);

  if (order) {
    return (
      <View>
        {orderItems &&
          orderItems.map((item, index) => (
            <ItemCart key={index} checkout={checkout} {...item} />
          ))}
      </View>
    );
  }

  return (
    <View>
      {items &&
        items.map((item, index) => (
          <ItemCart key={index} checkout={checkout} {...item} />
        ))}
    </View>
  );
}
