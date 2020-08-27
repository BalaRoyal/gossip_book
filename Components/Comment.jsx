import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import colors from '../constants/colors';

const Comment = (props) => {
  return (
    <View style={styles.comment}>
      <View style={styles.avatar}>
        <Text>User</Text>
      </View>
      <View style={styles.textCommentContainer}>
        <Text style={styles.commentText}>{props.comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    margin: 5,
    padding: 10,
    borderRadius: 20,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    backgroundColor: "#ffffff",
  },
  avatar: {
    borderRadius: 100,
    backgroundColor: "#eee",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  textCommentContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    marginLeft: 5,
    borderRadius: 20,
  },
  commentText: {
    padding: 10,
    fontFamily: "open-sans",
    color: colors.textColor,
  },
});

export default Comment;
