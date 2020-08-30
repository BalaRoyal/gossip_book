import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import styles from './styles';

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

export default Comment;
