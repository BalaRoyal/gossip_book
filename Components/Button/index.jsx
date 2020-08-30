import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import colors from '../../constants/colors';

export const CustomButton = (props) => (
  <Button
    onPress={props.onPress ?? props.onClick}
    mode="contained"
    {...props}
    style={{ ...styles.button, ...props.style }}
  >
    {props.children}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    borderColor: colors.primaryColor,
    borderWidth: 1,
    margin: 10,
  },
});

export default CustomButton;
