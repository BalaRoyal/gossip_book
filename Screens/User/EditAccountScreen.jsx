import React, { useCallback, useEffect, useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../Components/Button';
import Input from '../../Components/TextInput';
import colors from '../../constants/colors';
import { toCamelCase } from '../../helpers/helper-functions';
import { editUserProfile } from '../../redux/actions/user/profile';

const VALUE_CHANGE = "VALUE_CHANGE";

const fromReducer = (state, { type, payload }) => {
  switch (type) {
    case VALUE_CHANGE:
      return {
        ...state,
        [payload.name]: {
          value: payload.value,
          touched: payload.touched || false,
        },
      };
    default:
      return state;
  }
};
const EditProfileScreen = (props) => {
  const [form, dispatchForm] = useReducer(fromReducer, {
    firstName: {
      value: "",
      touched: false,
      error: null,
    },
    lastName: {
      value: "",
      touched: false,
      error: null,
    },
    username: {
      value: "",
      touched: false,
      error: null,
    },
    bio: {
      value: "",
      touched: false,
      error: null,
    },
    middleName: {
      value: "",
      touched: false,
      error: null,
    },

    username: {
      value: "",
      touched: false,
      error: null,
    },
  });

  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);
  useEffect(() => {
    const user = {};
    if (!loading && profile) {
      for (let key of Object.keys(profile)) {
        user[toCamelCase(key)] = profile[key];
        if (form[toCamelCase(key)]) {
          inputChangeHandler(toCamelCase(key), profile[key]);
        }
      }
    }
  }, [profile, loading, dispatchForm, toCamelCase]);

  const inputChangeHandler = useCallback(
    (name, value) => {
      dispatchForm({
        type: VALUE_CHANGE,
        payload: {
          name,
          value,
          touched: true,
        },
      });
    },
    [dispatchForm]
  );

  const submitHandler = () => {
    const userData = {};

    for (let key of Object.keys(form)) {
      if (form[key].value) {
        userData[key] = form[key].value;
      }
    }

    dispatch(editUserProfile(userData));
    props.navigation.navigate("Profile");
  };

  const { firstName, lastName, middleName, bio, username } = form;
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        display: "flex",
        flex: 1,
        backgroundColor: "#fff",
        padding: 30,
        height: "100%",
      }}
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
      enableAutomaticScroll={true}
    >
      <Text style={styles.formHeading}>Edit account information.</Text>
      <Input
        label="First name"
        onChangeText={(value) => inputChangeHandler("firstName", value)}
        value={firstName.value}
      />
      <Input
        label="Middle name"
        value={middleName.value}
        onChangeText={(value) => inputChangeHandler("middleName", value)}
      />
      <Input
        label="Last name"
        onChangeText={(value) => inputChangeHandler("lastName", value)}
        value={lastName.value}
      />

      <Input
        label="Username"
        onChangeText={(value) => inputChangeHandler("username", value)}
        value={username.value}
      />

      <View
        style={{
          maxHeight: 150,
        }}
      >
        <Input
          label="Bio"
          multiline
          onChangeText={(value) => inputChangeHandler("bio", value)}
          value={bio.value}
        />
      </View>
      <Button style={{ width: 100 }} onClick={submitHandler}>
        Save
      </Button>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "90%",
    marginBottom: 100,
    flex: 1,
  },
  formHeading: {
    fontWeight: "500",
    textTransform: "uppercase",
    color: colors.textColor,
  },
});
export default EditProfileScreen;
