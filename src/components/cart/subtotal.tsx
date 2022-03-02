import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../styles";
import { useSubtotal } from "../../utils/useSubtotal";
import { useAppSelector } from "../../redux";

interface Props {
  order?: boolean;
}

export default function CartSubtotal({ order }: Props) {
  const [subtotal, subtotalOrder] = useSubtotal();

  const { promo_code_discount } = useAppSelector((state) => state.cart);

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableItem}>
          <Text style={styles.tableLabel}>Item Total</Text>
          <Text style={styles.tableLabel}>
            ${order ? subtotalOrder : subtotal}
          </Text>
        </View>
        <View style={styles.tableItem}>
          <Text style={styles.tableLabel}>Discount</Text>
          <Text style={styles.tableLabel}>$5.00</Text>
        </View>
        {promo_code_discount ? (
          <View style={styles.tableItem}>
            <Text style={styles.deliveryLabel}>Promo Code Discount</Text>
            <Text style={styles.deliveryLabel}>${promo_code_discount}.00</Text>
          </View>
        ) : null}
        <View style={styles.tableItem}>
          <Text style={styles.deliveryLabel}>Delivery Fee</Text>
          <Text style={styles.deliveryLabel}>Free</Text>
        </View>
      </View>
      {!order && (
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>
            ${(Number(subtotal) - 5 - promo_code_discount).toFixed(2)}
          </Text>
        </View>
      )}
      {order && (
        <View style={{ paddingBottom: 80 }}>
          <View style={styles.tableItem}>
            <Text style={styles.tableLabel}>Total</Text>
            <Text style={styles.tableLabel}>
              ${(Number(subtotalOrder) - 5 - promo_code_discount).toFixed(2)}
            </Text>
          </View>
          <View style={styles.tableItem}>
            <Text style={styles.tableLabel}>Payment Method</Text>
            <Text style={styles.tableLabel}>Visa 45XX</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
    color: "black",
  },
  deliveryLabel: {
    color: colors.green,
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  total: {
    fontSize: 20,
  },
});
