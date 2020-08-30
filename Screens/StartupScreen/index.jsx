import React, { useEffect } from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/colors';
import * as authActions from '../../redux/actions/user-auth';
import styles from './styles';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (!userData) {
          dispatch(authActions.setDidTryAL());
          return;
        }
        const transformedData = JSON.parse(userData);
        const { token, userId, expiryDate } = transformedData;

        const expirationDate = new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
          dispatch(authActions.setDidTryAL());
          return;
        }

        const expirationTime = expirationDate.getTime() - new Date().getTime();

        dispatch(authActions.authenticate(userId, token, +expirationTime));
      } catch (err) {
        throw err;
      }
    };
    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  );
};

export default StartupScreen;
