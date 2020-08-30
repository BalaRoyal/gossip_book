import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import BackgroundImage from '../../assets/images/profileBG.jpg';
import colors from '../../constants/colors';
import styles from './styles';

const UserProfileScreen = (props) => {
  const { user } = props.route.params;
  const {
    profile_image_url,
    first_name,
    last_name,
    followers,
    following,
  } = user;

  const uri =
    profile_image_url ??
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfmJO1vZOid-nPBHG4aMhenFmy5zW4qPg_-g&usqp=CAU";
  return (
    <View style={styles.screen}>
      <ImageBackground source={BackgroundImage} style={styles.image}>
        <View style={styles.avatarImage}>
          <Image
            source={{
              uri: uri,
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {first_name} {last_name}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.profileStats}>
        <View>
          <Text style={styles.statValue}>10</Text>
          <Text style={styles.statsLabel}>Posts</Text>
        </View>

        <View>
          <Text style={styles.statValue}>{followers.length}</Text>
          <Text style={styles.statsLabel}>Followers</Text>
        </View>

        <View>
          <Text style={styles.statValue}>{following.length}</Text>
          <Text style={styles.statsLabel}>Following</Text>
        </View>
      </View>
      <Button
        onPress={() => {}}
        mode="contained"
        style={styles.followButton}
        theme={{
          colors: {
            primary: colors.primaryColor,
            accent: colors.highlighColor,
          },
          roundness: 5,
        }}
      >
        Follow
      </Button>

      <IconButton
        icon="chat"
        style={styles.chatButton}
        size={40}
        color={colors.textColor}
      />
    </View>
  );
};

export default UserProfileScreen;
