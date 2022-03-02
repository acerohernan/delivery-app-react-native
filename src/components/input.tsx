import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../styles";

/* Components */

interface InputProps {
  placeholder: string;
  iconName: string;
  onChangeText: (name: string, text: string) => void;
  autoFocus?: boolean;
  maxLength?: number;
  name: string;
}

export default function Input({
  placeholder = "",
  iconName,
  onChangeText,
  autoFocus,
  name,
  maxLength,
}: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={(text) => onChangeText(name, text)}
        autoFocus={autoFocus}
        key="name_tag"
        maxLength={maxLength ? maxLength : 99}
      />
      <Material name={iconName} style={styles.inputIcon} size={25} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  input: {
    backgroundColor: colors.gray,
    height: 55,
    borderRadius: 10,
    paddingLeft: 50,
    color: "black",
    fontSize: 15,
    borderColor: "#C2C2CB",
    borderWidth: 2,
  },
  inputIcon: {
    position: "absolute",
    top: 15,
    left: 15,
    textAlign: "center",
    color: "gray",
  },
});
