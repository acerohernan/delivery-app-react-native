import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamsList } from "../../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../styles";

import Material from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/button";
import { useAppDispatch } from "../../redux";
import { signUp } from "../../redux/reducers/user";
import { emailRegex, passwordRexeg } from "../../utils/regex";

/* Variables */

const screenHeight = Dimensions.get("screen").height;

//Social Media Button

interface SocialButtonProps {
  bgColor: string;
  title: string;
}

const SocialButton = ({ bgColor, title }: SocialButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: bgColor,
      height: 50,
      justifyContent: "center",
      borderRadius: 10,
      marginTop: 10,
    },
    title: {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 15,
    },
  });

  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

//Main

interface FormValues {
  username: string;
  email: string;
  password: string;
}

export default function SignUpScreen() {
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [inputValues, setInputValues] = useState<FormValues>({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = inputValues;

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamsList>>();
  const dispatch = useAppDispatch();

  /* Input Validations */
  const username_validation = username.length <= 15;
  const email_validation = emailRegex.test(email);
  const password_validation =
    passwordRexeg.test(password) && password.length > 5;

  const handleInputValue = (text: string, name: string) => {
    setInputValues({
      ...inputValues,
      [name]: text,
    });
  };

  const handleInputValidation = (name: string, validation: boolean) => {
    return () => {
      if (!validation) setErrors({ ...errors, [name]: true });
      if (validation) setErrors({ ...errors, [name]: false });
    };
  };

  const handleCreaterAccount = () => {
    if (!inputValues.email || !inputValues.password || !inputValues.username)
      return Alert.alert("Please complete the input fields.");

    if (!username_validation || !email_validation || !password_validation) {
      return Alert.alert("Please enter the correct information.");
    }
    if (
      !errors.username &&
      !errors.password &&
      !errors.email &&
      username_validation &&
      email_validation &&
      password_validation
    ) {
      dispatch(signUp({ username, email }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.text}>
          Enter your name, email and password for sign up.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have account?</Text>
        </TouchableOpacity>
        <KeyboardAvoidingView>
          <View style={{ marginBottom: 30 }}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Username"
                style={styles.input}
                onChangeText={(text) =>
                  handleInputValue(
                    text.toLocaleLowerCase().split(" ").join(""),
                    "username"
                  )
                }
                onEndEditing={handleInputValidation(
                  "username",
                  username_validation
                )}
              />
              <Material
                name="account-outline"
                style={styles.inputIcon}
                size={25}
              />
            </View>
            {errors.username && (
              <Text style={styles.error}>
                Please enter a valid username. (Max 15 characters)
              </Text>
            )}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                autoCompleteType="email"
                keyboardType="email-address"
                onChangeText={(text) =>
                  handleInputValue(text.toLowerCase(), "email")
                }
                onEndEditing={handleInputValidation("email", email_validation)}
              />
              <Material
                name="email-outline"
                style={styles.inputIcon}
                size={25}
              />
            </View>
            {errors.email && (
              <Text style={styles.error}>Please enter a valid email</Text>
            )}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                style={styles.input}
                onChangeText={(text) => handleInputValue(text, "password")}
                secureTextEntry={true}
                autoCompleteType="password"
                onEndEditing={handleInputValidation(
                  "password",
                  password_validation
                )}
              />
              <Material
                name="lock-outline"
                style={styles.inputIcon}
                size={25}
              />
            </View>
            {errors.password && (
              <Text style={styles.error}>
                Please enter a valid password. (Mininum 6 characters and one
                special character !@#$%ˆ&*)
              </Text>
            )}
          </View>
          <Button title="Create an account" onPress={handleCreaterAccount} />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.footer}>
        <SocialButton bgColor="#4267B2" title="Connect with Facebook" />
        <SocialButton bgColor="#86C6F4" title="Connect with Google" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  navigation: {
    backgroundColor: "white",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  navigationButton: {
    backgroundColor: colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    borderRadius: 10,
  },
  body: {
    backgroundColor: "white",
    height: screenHeight - 320,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
  },
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  link: {
    color: colors.green,
    fontWeight: "bold",
    marginBottom: 15,
  },

  goSignup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  or: {
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    marginTop: 15,
  },
  input: {
    backgroundColor: colors.gray,
    height: 55,
    borderRadius: 10,
    paddingLeft: 50,
    color: "gray",
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
  footer: {
    backgroundColor: "white",
  },
  error: {
    color: "red",
  },
});
