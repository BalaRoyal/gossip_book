import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import AppNavigator from "./Navigation/AppNavigator";
import colors from "./constants/colors";

const theme = {
  ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    accent: colors.accentColor,
    primary: colors.primaryColor,
  },
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const fetchFonts = () => {
    return Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigator />
        <StatusBar style="auto" />
      </PaperProvider>
    </Provider>
  );
}
