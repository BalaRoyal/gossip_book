import React from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import Button from "../../Components/shared-components/Button";
import colors from "../../constants/colors";
import { Entypo } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import LogoImage from "../../assets/images/gossip_book_logo.png";
import { login } from "../../redux/actions/user-auth";
import { connect } from "react-redux";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo";
const IOS_GOOGLE_AUTH_ID =
  "922743539522-i36qqi8rmaqgos9cud5a0rqklldo042c.apps.googleusercontent.com";
const ANDROID_GOOGLE_AUTH_ID =
  "922743539522-2e8cp6nse84n08urheofk1oai7j0l88f.apps.googleusercontent.com";

FACEBOOK_CLIENT_ID = "0215ccbe764c1cfb043911acb6180455";

const LoginOptionScreen = (props) => {
  const { authWithGoogle, authWithFacebook, loading, error } = props;

  // Login with Google
  const handlerLoginWithGoogle = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: IOS_GOOGLE_AUTH_ID,
      androidClientId: ANDROID_GOOGLE_AUTH_ID,
      scopes: ["profile", "email"],
    });

    if (type === "success") {
      await authWithGoogle(accessToken);
    }
  };

  // Login with Facebook

  const handleAuthWithFacebook = async () => {
    // const { type , accessToken, user} =
  };

  let content = <ActivityIndicator size="large" />;

  if (!loading) {
    content = (
      <>
        <View style={styles.logoContainer}>
          <Image source={LogoImage} style={styles.logoImage} />
          <View style={styles.welcomeView}>
            <Text style={styles.welcomeText}>
              A true information sharing social network.
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon={({ color }) => (
              <Entypo name="google--with-circle" color={color} size={30} />
            )}
            theme={{
              colors: { primary: colors.brownColor, accent: colors.brownColor },
            }}
            style={{ borderColor: colors.accentColor }}
            onPress={handlerLoginWithGoogle}
          >
            Connect with Google
          </Button>
          <Button
            style={{
              borderColor: colors.blueColor,
            }}
            icon={({ color }) => (
              <Entypo name="facebook" color={color} size={30} />
            )}
            theme={{
              colors: { primary: colors.blueColor, accent: colors.blueColor },
            }}
          >
            Connect with Facebook
          </Button>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen} color={colors.whiteColor}>
      {content}
    </View>
  );
};

const mapStateToProps = (state) => ({
  authToken: state.auth.token,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  authWithGoogle: (accessToken) => dispatch(login(accessToken, "google")),
  authWithFacebook: (accessToken) => dispatch(login(accessToken, "facebook")),
});

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-evenly",
    paddingBottom: 50,
  },
  buttonContainer: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  welcomeText: {
    textAlign: "center",
    padding: 10,
    fontSize: 24,
    fontWeight: "300",
    margin: 20,
    lineHeight: 40,
    letterSpacing: 1.5,
    color: colors.textColor,
  },
  logoContainer: {
    borderColor: "red",
    display: "flex",
    justifyContent: "center",
  },
  logoImage: {
    width: 150,
    height: 150,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptionScreen);
