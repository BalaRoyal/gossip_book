import { Entypo } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import React from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { Text } from "react-native-paper";
import { connect } from "react-redux";

import LogoImage from "../../assets/images/gossip_book_logo.png";
import Button from "../../Components/Button";
import colors from "../../constants/colors";
import { login } from "../../redux/actions/user-auth";
import styles from "./styles";
import { LoginManager } from "react-native-fbsdk";
import * as Facebook from "expo-facebook";
import { useDispatch, useSelector } from "react-redux";
import { finishUserLogin } from "../../redux/actions/user-auth";

const IOS_GOOGLE_AUTH_ID =
  "922743539522-i36qqi8rmaqgos9cud5a0rqklldo042c.apps.googleusercontent.com";
const ANDROID_GOOGLE_AUTH_ID =
  "922743539522-2e8cp6nse84n08urheofk1oai7j0l88f.apps.googleusercontent.com";

FACEBOOK_CLIENT_ID = "0215ccbe764c1cfb043911acb6180455";

const LoginOptionScreen = (props) => {
  const { authWithGoogle, authWithFacebook, loading, error } = props;
  const dispatch = useDispatch();

  //rRw++LUjmZZ+58EbN5DVhGAnkX4=
  //rRw__LUjmZZ_58EbN5DVhGAnkX4=
  //xnb3nfVSqRIpd6dckeH71ZjPqvc=
  // ga0RGNYHvNM5d0SLGQfpQWAPGJ8=
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
    try {
      await Facebook.initializeAsync("2517327701899366");
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        await authWithFacebook(token);
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data, "data");
            alert("fb login success with email " + data.email);
            // dispatch(finishUserLogin(data));
            // setLoggedinStatus(true);
            // setUserData(data);
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      console.log(message, "errorm");
    }
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
            onPress={handleAuthWithFacebook}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptionScreen);
