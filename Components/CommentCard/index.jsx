import React from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

import { getInitials } from '../../helpers/helper-functions';
import styles from './styles';

const Comment = (props) => {
  const {
    user: { profile_image_url, first_name, last_name },
  } = props;

  return (
    <View style={styles.comment}>
      <View style={styles.avatar}>
        {profile_image_url ? (
          <Image
            source={{ uri: profile_image_url }}
            style={styles.avatarImage}
          />
        ) : (
          <Text style={styles.avatarInitials}>
            {getInitials(first_name, last_name)}
          </Text>
        )}
      </View>
      <View style={styles.textCommentContainer}>
        <Text style={styles.username}>
          {first_name} {last_name}
        </Text>
        <Text style={styles.commentText}>{props.comment}</Text>
      </View>
    </View>
  );
};

export default Comment;
