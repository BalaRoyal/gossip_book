import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

import colors from '../constants/colors';

const ContentCard = (props) => {
  const { image_url: imageUrl, title, created_at } = props;

  return (
    <TouchableNativeFeedback onPress={props.onPostOverview}>
      <View style={styles.card}>
        <View style={styles.cardHeading}>
          <View style={styles.userAvatar}></View>
          <View style={styles.userInfo}>
            <Text style={styles.username}> Mwibutsa Floribert </Text>
            <Text style={styles.time}> {moment(created_at).fromNow()} </Text>
          </View>
          <View style={styles.VoteStat}></View>
        </View>
        <View style={styles.cardTitle}>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>

        {imageUrl && (
          <View style={styles.cardImage}>
            <Image
              source={{
                uri: imageUrl,
              }}
              style={{ ...styles.image, minHeight: imageUrl ? 150 : 0 }}
            />
          </View>
        )}
        {props.gossip_description && (
          <View>
            <Text style={styles.cardText}>{props.gossip_description}</Text>
          </View>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: "98%",
    alignSelf: "center",
    marginBottom: 5,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowColor: "#D9DECE",
    shadowOpacity: 1.0,
    margin: 2,
    borderRadius: 10,
  },
  username: {
    fontWeight: "400",
    color: colors.textColorPrimary,
    fontSize: 13,
  },
  cardHeading: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
  },
  userAvatar: {
    backgroundColor: "#cccc",
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  userInfo: {
    flex: 1,
    alignSelf: "center",
    fontSize: 12,
    fontFamily: "open-sans",
  },
  VoteStat: {
    padding: 2,
    flex: 1,
    alignSelf: "center",
    backgroundColor: colors.brownColor,
  },
  cardImage: {},
  image: {
    width: "100%",
    maxHeight: 300,
  },
  cardText: {
    lineHeight: 24,
    color: colors.textColor,
    fontFamily: "open-sans",
    padding: 5,
    textAlign: "justify",
  },
  time: {
    color: colors.accentColor,
    fontSize: 8,
  },
  cardTitle: {
    fontWeight: "500",
    color: colors.textColor,
    margin: 5,
  },
});

ContentCard.propTypes = {
  image_url: PropTypes.string,
  title: PropTypes.string.isRequired,
  votes: PropTypes.array,
  gossip_description: PropTypes.string,
};
export default ContentCard;
