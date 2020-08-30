import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, Image, ScrollView, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { getPermissionsAsync, pickImage } from '../../helpers/imageUpload';
import { getUserProfile } from '../../redux/actions/user/profile';
import styles from './styles';

const ProfileScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      dispatch(getUserProfile(transformedData.userId));
    };
    getProfile();
  }, [dispatch]);

  const [image, setImage] = useState({});

  const pickProfileImage = () => {
    getPermissionsAsync();
    pickImage(setImage);
  };

  const { profile, loading, error } = useSelector((state) => state.user);

  if (error) {
    Alert.alert("Something went wrong!");
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#eeeeff",
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: "#eeeeff",
        }}
      >
        {!loading && profile && (
          <>
            <View style={styles.profileAvatar}>
              <Image
                source={{
                  uri:
                    profile.profile_image_url ||
                    image.uri ||
                    "https://pickaface.net/gallery/avatar/jquan0755a199bfcb71d.png",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                  borderRadius: 100,
                }}
              />
              <IconButton
                style={styles.cameraIcon}
                icon="camera"
                size={30}
                color={colors.textColor}
                onPress={pickProfileImage}
              />
            </View>
            <View style={styles.content}>
              <View style={styles.followersStat}>
                <Text style={styles.followStat}>
                  Followers: {profile.followers.length}
                </Text>
                <Text style={styles.followStat}>
                  Following: {profile.following.length}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.text}>
                  {profile.first_name} {profile.last_name}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.text}>{profile.email}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Bio:</Text>
                <Text style={styles.text}>{profile.bio || "No bio"}</Text>
              </View>
            </View>
          </>
        )}
        {loading && <ActivityIndicator size="large" />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
