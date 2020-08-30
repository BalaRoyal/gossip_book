import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import ErrorImage from './assets/images/oh-shit.png';
import colors from './constants/colors';
import * as RootNavigation from './Navigation/RootNavigation';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.ErrorBoundary}>
          <View style={styles.imageContainer}>
            <Image source={ErrorImage} style={styles.image} />
          </View>
          <Text style={styles.text}>Something went wrong</Text>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              RootNavigation.navigate("Home", {});
            }}
          >
            Go back Home
          </Button>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  ErrorBoundary: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageContainer: {
    width: "80%",
    alignItems: "center",
    margin: 20,
  },
  image: {
    height: 200,
    width: 250,
  },
  text: {
    color: colors.brownColor,
    fontSize: 24,
  },
  button: {
    marginTop: 20,
  },
});

export default ErrorBoundary;
