import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../constants/colors";
import { Text } from "react-native-paper";
import { TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

const styles = StyleSheet.create({
  card: {
    justifyContent: "flex-end",
    width: 100,
    height: 100,
    margin: 4,
    backgroundColor: colors.whiteColor,
    padding: 8,
    borderRadius: 10,
    fontWeight: "bold",
  },
  text: {
    fontWeight: "600",
    color: colors.whiteColor,
  },
  checkMark: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default InterestCard;
