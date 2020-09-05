import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return <View style={styles.card}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 10,
  },
});

export default Card;
