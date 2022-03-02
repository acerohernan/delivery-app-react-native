import { NavigationScreenParams } from "@react-navigation/native";
import { IRestaurant } from "../redux/models";

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
  Restaurant: {
    name: string;
    image_url: string;
    is_closed: boolean;
    review_count: number;
    categories: Array<IRestaurantCategory>;
    rating: number;
    price: string;
  };
  MenuItem: {
    title: string;
    description: string;
    price: string;
    image: string;
    restaurantName: string;
  };
  Cart: undefined;
  Checkout: undefined;
  Order: undefined;
  PaymentMethod: undefined;
  CreditCardMethod: undefined;
  Address: undefined;
  NewAddress: undefined;
  Profile: undefined;
};
