import React from "react";

import { Provider } from "react-redux";
import store from "./src/redux/store";

import RootStackComponent from "./src/router";

export default function App() {
  return (
    <Provider store={store}>
      <RootStackComponent />
    </Provider>
  );
}
