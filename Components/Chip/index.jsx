import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

import colors from '../../constants/colors';

const PostType = (props) => {
  return (
    <Chip
      style={styles.chip}
      selectedColor={props.selected ? colors.primaryColor : colors.textColor}
      selected={props.selected}
      mode="outlined"
      theme={{
        colors: {
          primary: colors.textColor,
          accent: colors.textColor,
        },
        roundness: 0,
      }}
      onPress={() => props.handleSelected(props.type)}
    >
      {props.children}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 0,
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
});
export default PostType;
