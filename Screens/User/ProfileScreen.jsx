import React, { useEffect } from 'react';
import { ActivityIndicator, AsyncStorage, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { getUserProfile } from '../../redux/actions/user/profile';

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

  const { profile, loading, error } = useSelector((state) => state.user);

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
                    "https://pickaface.net/gallery/avatar/jquan0755a199bfcb71d.png",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
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

const styles = StyleSheet.create({
  profileAvatar: {
    backgroundColor: "#eeee",
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: -50,
    zIndex: 1,
  },
  content: {
    width: "95%",
    padding: 30,
    backgroundColor: colors.whiteColor,
    borderRadius: 10,
    paddingTop: 50,
  },
  label: {
    fontWeight: "600",
    color: colors.textColor,
    lineHeight: 32,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  text: {
    lineHeight: 32,
    marginLeft: 20,
    color: colors.textColor,
    fontFamily: "open-sans",
  },
  followersStat: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#eeee",
    padding: 10,
    justifyContent: "space-evenly",
    margin: 5,
    borderRadius: 10,
    flexWrap: "wrap",
  },
  followStat: {
    textTransform: "uppercase",
    fontWeight: "500",
    color: colors.textColor,
  },
});

export default ProfileScreen;
