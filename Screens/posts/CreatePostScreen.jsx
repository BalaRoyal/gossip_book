import React, { useState, useReducer, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import Chip from "../../Components/shared-components/Chip";
import colors from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput as Input } from "react-native-paper";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import { createQuestion } from "../../redux/actions/post/question";
import { createGossip } from "../../redux/actions/post/gossip";

const VALUE_CHANGE = "VALUE_CHANGE";
const VALIDATION_ERROR = "VALIDATION_ERROR";

const formReducer = (state, { type, payload }) => {
  switch (type) {
    case VALUE_CHANGE:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case VALIDATION_ERROR:
      return {
        ...state,
        errors: payload.errors,
      };
    default:
      return state;
  }
};

const CreatePostScreen = (props) => {
  const [postType, setPostType] = useState("question");
  const [height, setHeight] = useState();

  const [formValues, formDispatch] = useReducer(formReducer, {
    title: "",
    description: "",
    errors: {
      title: "",
      description: "",
    },
  });

  const submitHandler = () => {
    if (isFormValid({ title, description })) {
      postType === "question"
        ? dispatch(createQuestion({ title: description }))
        : dispatch(
            createGossip({
              title,
              gossip_description: description,
              gossip_type: postType.toUpperCase(),
            })
          );
    }
    formDispatch({
      type: VALUE_CHANGE,
      payload: {
        name: "title",
        value: "",
      },
    });
    formDispatch({
      type: VALUE_CHANGE,
      payload: {
        name: "description",
        value: "",
      },
    });
    props.navigation.navigate("Home");
  };

  const dispatch = useDispatch();

  const handleSelected = (type) => {
    setPostType(type);
  };

  const isFormValid = (formValues) => {
    const { title, description } = formValues;
    let titleError = "";
    let descriptionError = "";

    if (postType !== "question" && title.trim() === "") {
      titleError = "Title is required";
    }

    if (description.trim() === "") {
      descriptionError = "Description is required";
    }

    formDispatch({
      type: VALIDATION_ERROR,
      payload: {
        errors: {
          titleError,
          descriptionError,
        },
      },
    });

    return titleError === "" && descriptionError === "";
  };

  const valueChangeHandler = useCallback((name, value) => {
    formDispatch({
      type: VALIDATION_ERROR,
      payload: {
        errors: {
          titleError: "",
          descriptionError: "",
        },
      },
    });
    formDispatch({
      payload: { name, value },
      type: VALUE_CHANGE,
    });
  });

  const { title, description } = formValues;

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.screen}
        keyboardVerticalOffset={50}
        behavior="padding"
      >
        <View style={styles.header}>
          <Text style={styles.heading}>Share your idea with the community</Text>
          <View style={styles.postType}>
            <Chip
              handleSelected={handleSelected}
              type="question"
              selected={postType === "question"}
            >
              Ask question
            </Chip>
            <Chip
              handleSelected={handleSelected}
              type="gossip"
              selected={postType === "gossip"}
            >
              Add Gossip
            </Chip>
            <Chip
              handleSelected={handleSelected}
              type="cheater"
              selected={postType === "cheater"}
            >
              Add Cheater
            </Chip>
          </View>
        </View>
        {postType !== "question" && (
          <TextInput
            style={{
              ...styles.title,
            }}
            placeholder="Title"
            onChangeText={(value) => valueChangeHandler("title", value)}
            value={title}
          />
        )}
        <View style={styles.inputContainer}>
          <Input
            style={{
              ...styles.textInput,
              height: height,
            }}
            placeholder="Type here ..."
            multiline
            onContentSizeChange={({ height }) => setHeight(height)}
            autoFocus
            underlineColor="#ffff"
            theme={{
              colors: {
                primary: "#ccc",
                accent: "#ddd",
              },
            }}
            onChangeText={(value) => valueChangeHandler("description", value)}
            value={description}
          />
        </View>

        <MaterialCommunityIcons
          name="send-circle"
          style={styles.sendButton}
          size={50}
          onPress={submitHandler}
        />
      </KeyboardAvoidingView>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    minHeight: 100,
    display: "flex",
    justifyContent: "center",
  },
  heading: {
    marginTop: 40,
    textTransform: "uppercase",
    alignSelf: "center",
  },
  postType: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    margin: 10,
  },
  textInput: {
    maxHeight: 200,
    color: colors.textColor,
    backgroundColor: "#eee",
    alignSelf: "center",
    flex: 1,
    paddingTop: 15,
    width: "100%",
  },
  title: {
    height: 40,
    backgroundColor: "#eee8",
    marginLeft: 20,
    fontWeight: "bold",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "90%",
  },
  inputContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
  },
  info: {
    textAlign: "center",
    margin: 10,
  },

  sendButton: {
    alignSelf: "flex-end",
    color: colors.primaryColor,
    margin: 3,
  },
  formInputs: {
    flex: 1,
    width: "100%",
    backgroundColor: "red",
    display: "flex",
  },
});

export default CreatePostScreen;
