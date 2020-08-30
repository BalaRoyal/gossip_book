import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, TouchableNativeFeedback, View } from 'react-native';

import { getInitials } from '../../helpers/helper-functions';
import styles from './styles';

const ContentCard = (props) => {
  const { image_url: imageUrl, title, created_at, user } = props;

  return (
    <TouchableNativeFeedback onPress={props.onPostOverview}>
      <View style={styles.card}>
        <View style={styles.cardHeading}>
          <TouchableNativeFeedback
            onPress={() => {
              props.onAvatarClick
                ? props.onAvatarClick(user)
                : (() => {
                    console.log("Please attach a method!");
                  })();
            }}
          >
            <View style={styles.userAvatar}>
              {user.profile_image_url ? (
                <Image
                  source={{ uri: user.profile_image_url }}
                  style={styles.avatarImage}
                />
              ) : (
                <Text style={styles.initials}>
                  {getInitials(user.first_name, user.last_name)}
                </Text>
              )}
            </View>
          </TouchableNativeFeedback>
          <View style={styles.userInfo}>
            <Text style={styles.username}>
              {user.first_name} {user.last_name}{" "}
            </Text>
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

ContentCard.prototype = {
  user: PropTypes.object.isRequired,
  image_url: PropTypes.string,
};

export default ContentCard;
