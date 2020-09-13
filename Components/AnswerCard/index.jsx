import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { getInitials } from '../../helpers/helper-functions';
import styles from './styles';

const AnswerCard = (props) => {
  const { comment, user, question, gossip } = props;
  const { first_name, last_name, profile_image_url } = user;
  let initials = "";

  if (!profile_image_url) {
    initials = getInitials(first_name, last_name);
  }

  return (
    <View style={styles.card}>
      <View style={styles.userAvatar}>
        {profile_image_url && (
          <Image
            source={{
              uri: profile_image_url,
            }}
            style={styles.avatarImage}
          />
        )}
        {!profile_image_url && <Text style={styles.initials}>{initials}</Text>}
      </View>
      <View style={styles.answer}>
        <View>
          <Text style={styles.title}>
            {question
              ? `[Question] ${question.title}`
              : `[Gossip] ${gossip.title}`}
          </Text>
          <Text style={styles.text}>{comment}</Text>
        </View>
        <Button
          icon={({ size, color }) => (
            <FontAwesome color={color} size={18} name="share-alt" />
          )}
          mode="outlined"
          style={styles.button}
          onPress={() => {}}
          labelStyle={{ fontSize: 10 }}
        >
          Share
        </Button>
      </View>
    </View>
  );
};

export default AnswerCard;
