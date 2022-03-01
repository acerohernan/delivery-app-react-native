import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../styles";
import { useSubtotal } from "../../utils/useSubtotal";

export default function CartSubtotal() {
  const subtotal = useSubtotal();

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableItem}>
          <Text style={styles.tableLabel}>Item Total</Text>
          <Text style={styles.tableLabel}>${subtotal}</Text>
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
        <Text style={styles.total}>${(Number(subtotal) + 10).toFixed(2)}</Text>
      </View>
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
