import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import colors from '../constants/colors';

const Input = (props) => (
  <TextInput
    style={styles.input}
    label={props.label}
    value={props.value}
    onChangeText={props.onChangeText}
    mode="flat"
    theme={{
      colors: {
        primary: colors.primaryColor,
      },
    }}
    underlineColor={colors.underlineColor}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.whiteColor,
    height: 60,
  },
});

export default Input;
