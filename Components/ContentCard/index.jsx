import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, TouchableNativeFeedback, View } from 'react-native';

import styles from './styles';

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

ContentCard.propTypes = {
  image_url: PropTypes.string,
  title: PropTypes.string.isRequired,
  votes: PropTypes.array,
  gossip_description: PropTypes.string,
};
export default ContentCard;
