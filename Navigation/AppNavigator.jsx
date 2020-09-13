import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import AuthScreen from '../Screens/AuthScreen';
import StartupScreen from '../Screens/StartupScreen';
import { MainNavigator } from './GossipNavigator';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuth && <MainNavigator />}
        {!isAuth && didTryAutoLogin && <AuthScreen />}
        {!isAuth && !didTryAutoLogin && <StartupScreen />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
