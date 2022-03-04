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
import {
  AuthStackParamsList,
  RootStackParamsList,
} from "../../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../styles";

import Material from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../components/button";
import { emailRegex, passwordRexeg } from "../../utils/regex";

/* Variables */

const screenHeight = Dimensions.get("screen").height;

/* Components */

//Checkbox

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
}

const CheckBox = ({ checked, onPress }: CheckboxProps) => {
  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
    },
    checkbox: {
      borderRadius: 20,
      width: 35,
      height: 20,
      marginRight: 10,
      backgroundColor: checked ? colors.green : "#C2C2CB",
    },
    circle: {
      backgroundColor: "white",
      borderRadius: 100,
      position: "absolute",
      top: 2.5,
      zIndex: 2,
      width: 15,
      height: 15,
      left: checked ? 17 : 3,
    },
    label: {
      color: "gray",
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.checkbox}>
        <View style={styles.circle} />
      </View>
      <Text style={styles.label}>Remember Me</Text>
    </TouchableOpacity>
  );
};

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
  email: string;
  password: string;
}

export default function LoginScreen() {
  const [remember, setRemember] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const { email, password } = inputValues;

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamsList>>();
  const navigationRoot =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const email_validation = emailRegex.test(email);
  const password_validation = passwordRexeg.test(password);

  const handleSignIn = () => {
    if (!email || !password) return Alert.alert("Please complete the fields.");

    if (errors.email || errors.password)
      return Alert.alert("Please correct the information.");

    if (
      !errors.email &&
      !errors.password &&
      email_validation &&
      password_validation
    ) {
      setIsSubmitted(true);
    }
  };

  const handleInputValue = (name: string) => (text: string) => {
    setInputValues({ ...inputValues, [name]: text });
  };

  const handleInputValidation = (name: string, validation: boolean) => () => {
    if (validation) setErrors({ ...errors, [name]: false });
    if (!validation) setErrors({ ...errors, [name]: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.body}>
        <Text style={styles.title}>Welcome to Rappi</Text>
        <Text style={styles.text}>
          Enter your Phone number or Email address for sign it. Enyoi your food.
        </Text>
        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              autoCompleteType="email"
              onChangeText={handleInputValue("email")}
              onEndEditing={handleInputValidation("email", email_validation)}
            />
            <Material
              name="account-outline"
              style={styles.inputIcon}
              size={25}
            />
          </View>
          {errors.email && (
            <Text style={{ color: "red" }}>Please enter a valid email</Text>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
              autoCompleteType="password"
              onChangeText={handleInputValue("password")}
              onEndEditing={handleInputValidation(
                "password",
                password_validation
              )}
            />
            <Material name="lock-outline" style={styles.inputIcon} size={25} />
          </View>
          {errors.password && (
            <Text style={{ color: "red" }}>
              Password must have more than 6 characters and one special
              character (!@#$%ˆ&*).
            </Text>
          )}
          <View style={styles.rememberContainer}>
            <CheckBox
              checked={remember}
              onPress={() => setRemember(!remember)}
            />
            <TouchableOpacity>
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <Button title="Sign In" onPress={handleSignIn} />
        </KeyboardAvoidingView>
        {isSubmitted && (
          <Text style={{ color: "red" }}>
            The email or password are incorrect. Please create an account.
          </Text>
        )}
        <View style={styles.goSignup}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Signup</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 20,
    padding: 15,
    flexDirection: "column",
  },

  body: {
    backgroundColor: "white",
    height: screenHeight - 250,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    marginBottom: 15,
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
  footer: {
    backgroundColor: "white",
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
});
