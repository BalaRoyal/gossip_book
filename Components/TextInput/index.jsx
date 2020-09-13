import React from 'react';
import { TextInput } from 'react-native-paper';

import colors from '../../constants/colors';
import styles from './styles';

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
        accent: colors.textColor,
      },
    }}
    underlineColor="#fff"
    {...props}
  />
);

export default Input;
