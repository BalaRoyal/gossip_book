import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { Platform } from "react-native";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={FontAwesome}
      iconSize={props.size ? props.size : 32}
      color={Platform.OS === "android" ? "white" : colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
