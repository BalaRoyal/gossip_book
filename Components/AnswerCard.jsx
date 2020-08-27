import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import colors from '../constants/colors';
import { getInitials } from '../helpers/helper-functions';

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
            <FontAwesome color={color} size={24} name="share-alt" />
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

const styles = StyleSheet.create({
  card: {
    display: "flex",
    margin: 5,
    flexDirection: "row",
    borderColor: "#eee",
    borderBottomWidth: 1,
  },
  userAvatar: {
    height: 60,
    width: 60,
    backgroundColor: "#eee",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  answer: {
    flex: 1,
    padding: 10,
    marginLeft: 5,
  },
  text: {
    fontFamily: "open-sans",
    color: colors.textColor,
    lineHeight: 24,
    textAlign: "justify",
    padding: 4,
  },
  button: {
    fontSize: 12,
    alignSelf: "flex-start",
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    color: colors.textColor,
    padding: 5,
  },
  initials: {
    textTransform: "uppercase",
    fontSize: 24,
    color: colors.primaryColor,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
});
export default AnswerCard;
