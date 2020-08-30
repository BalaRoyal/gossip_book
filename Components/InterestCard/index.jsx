import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-paper';

import colors from '../../constants/colors';
import styles from './styles';

const InterestCard = (props) => {
  const { selected } = props;
  const func = props.selected ? props.handleDeselect : props.handleSelected;
  const selectionBorder = selected
    ? {
        borderWidth: 3,
        borderColor: colors.blueColor,
      }
    : {};
  return (
    <TouchableHighlight
      onPress={func}
      {...props}
      style={{
        ...styles.card,
        ...props.style,
        backgroundColor: selected ? colors.whiteColor : props.bgColor,
        ...selectionBorder,
      }}
      underlayColor={colors.highlighColor}
    >
      <View>
        {props.selected && (
          <View style={styles.checkMark}>
            <Ionicons
              name="md-checkmark-circle"
              size={32}
              color="green"
            ></Ionicons>
          </View>
        )}
        <Text
          style={{
            ...styles.text,
            color: selected ? colors.blueColor : colors.whiteColor,
          }}
        >
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default InterestCard;
