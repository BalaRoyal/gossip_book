import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator, MainNavigator } from "./GossipNavigator";
import StartupScreen from "../Screens/user/StartupScreen";
import { useSelector } from "react-redux";
import AuthScreen from "../Screens/user/AuthScreen";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && didTryAutoLogin && <AuthScreen />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
