import { NavigationScreenParams } from "@react-navigation/native";

export type RootStackParamsList = {
  Onboard: undefined;
  AuthStack: NavigationScreenParams<AuthStackParamsList>;
  DashboardStack: NavigationScreenParams<DashboardStackParamsList>;
};

export type AuthStackParamsList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type DashboardStackParamsList = {
  Home: undefined;
  Restaurant: undefined;
  MenuItem: undefined;
  Cart: undefined;
  Checkout: undefined;
  Order: undefined;
  PaymentMethod: undefined;
  CreditCardMethod: undefined;
  Profile: undefined;
};
