import { NavigationScreenParams } from "@react-navigation/native";

export type RootStackParamsList = {
  Onboard: undefined;
  AuthStack: NavigationScreenParams<AuthStackParamsList>;
  Home: undefined;
};

export type AuthStackParamsList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};
