import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";

import colors from "../../constants/colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={FontAwesome}
      iconSize={props.size ? props.size : 32}
      color={
        Platform.OS === "android" ? colors.primaryColor : colors.primaryColor
      }
    />
  );
};

export default CustomHeaderButton;
