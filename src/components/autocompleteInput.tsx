import { StyleSheet, View } from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../styles";

export default function AutocompleteInput() {
  if (true)
    return (
      <GooglePlacesAutocomplete
        placeholder="Address"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data);
        }}
        query={{
          key: "AIzaSyDrs5AlcUEEaB4nOwy_PSd-8qOmdQdYbFA",
          language: "en",
        }}
        styles={{
          textInput: styles.input,
        }}
      />
    );

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Address"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data);
        }}
        query={{
          key: "AIzaSyDrs5AlcUEEaB4nOwy_PSd-8qOmdQdYbFA",
          language: "en",
        }}
        styles={{
          textInput: styles.input,
        }}
      />
      <Material name="map-marker-outline" style={styles.inputIcon} size={25} />
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
