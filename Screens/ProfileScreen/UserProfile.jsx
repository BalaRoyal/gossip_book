import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, AsyncStorage, Image, ImageBackground, Text, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundImage from '../../assets/images/profileBG.jpg';
import colors from '../../constants/colors';
import { followUser, getUserProfile } from '../../redux/actions/user/profile';
import styles from './styles';

const UserProfileScreen = (props) => {
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);

  const { user } = props.route.params;
  const {
    profile_image_url,
    first_name,
    last_name,
    followers,
    following,
    id,
  } = user;

  const uri =
    profile_image_url ??
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfmJO1vZOid-nPBHG4aMhenFmy5zW4qPg_-g&usqp=CAU";

  const { profile, loading, error } = useSelector(({ user }) => user);

  useFocusEffect(
    useCallback(() => {
      const getProfile = async () => {
        const userData = await AsyncStorage.getItem("userData");
        const transformedData = JSON.parse(userData);
        dispatch(getUserProfile(transformedData.userId));
      };
      getProfile();
    }, [dispatch])
  );

  useEffect(() => {
    const checkIsFollowing = async () => {
      try {
        // check if the current logged in user follows the user profile
        const following = profile.following.find((followingUser) => {
          return (
            followingUser.user_id === id && followingUser.is_following === true
          );
        });

        if (following) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Something went wrong!", "");
      }
    };

    if (!loading && profile.following) {
      checkIsFollowing();
    }
  }, [profile, loading]);

  const handleFollowUser = () => {
    dispatch(followUser(id));
  };

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
        onPress={handleFollowUser}
        mode="contained"
        style={styles.followButton}
        theme={{
          colors: {
            primary: colors.primaryColor,
            accent: colors.highlighColor,
          },
          roundness: 5,
        }}
        loading={loading}
      >
        {isFollowing ? "Un follow" : "Follow"}
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
