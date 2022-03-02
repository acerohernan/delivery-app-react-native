import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../styles";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";

interface Props {
  description: string;
  selectedSection: number;
}

export default function MenuItemSection({
  selectedSection,
  description,
}: Props) {
  if (selectedSection === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Details</Text>
        </View>
        <View>
          <Text style={styles.text}>{description}</Text>
        </View>
      </View>
    );
  }

  if (selectedSection === 2) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Review</Text>
        </View>
        <View>
          <Text style={styles.text}>
            This cozy restaurant has left the best impressions! I recommend to
            everyone!
          </Text>
          <Text style={styles.text}>
            Hospitable hosts, delicious dishes, beautiful presentation, wide
            wine list and wonderful dessert.
          </Text>
          <Text style={styles.text}>
            I would like to come back here again and again.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choise your extra</Text>
        <Text style={styles.required}>Optional</Text>
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
            onChange={(e: ICheckboxButton) => true}
            style={{ flexDirection: "column" }}
          />
        </View>
      </View>
    </View>
  );
}

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
  text: {
    color: "gray",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  required: {
    padding: 10,
    color: colors.orange,
    backgroundColor: colors.orangeLight,
    borderRadius: 10,
    fontWeight: "bold",
  },
});
