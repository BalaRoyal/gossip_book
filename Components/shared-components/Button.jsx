import { Button } from "react-native-paper";
import { Platform, StyleSheet, Keyboard } from "react-native";
import React from "react";
import colors from "../../constants/colors";

export const CustomButton = (props) => (
  <Button
    onPress={() => {
      Keyboard.dismiss();
    }}
    mode="contained"
    textAlign="left"
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
