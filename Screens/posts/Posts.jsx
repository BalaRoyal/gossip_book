import React, { useState, useEffect } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from "react-native";
import colors from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import PostType from "../../Components/shared-components/Chip";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/shared-components/HeaderButton";
import ContentCard from "../../Components/shared-components/ContentCard";

import { fetchQuestions } from "../../redux/actions/post/question";
import { connect } from "react-redux";

const PostsScreen = (props) => {
  const [inputHeight, setInputHeight] = useState(40);
  const [postType, setPostType] = useState("question");
  const [post, setPost] = useState("");

  const handleSelected = (type) => {
    setPostType(type);
  };

  const handleSubmitPost = () => {};

  const { getQuestions } = props;

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const { loading, questions } = props;

  let content = (
    <ActivityIndicator
      size="large"
      color={colors.primaryColor}
      style={{ alignSelf: "center" }}
    />
  );

  if (!loading) {
    content = (
      <FlatList
        data={questions}
        renderItem={(question) => <ContentCard data={question} />}
        keyExtractor={(item) => item.id}
      />
    );
  }
  return (
    <View>
      <View style={styles.heading}></View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="text"
            style={{ ...styles.textInput, height: inputHeight }}
            multiline
            onBlur={() => {
              Keyboard.dismiss();
            }}
            autoCorrect
            caretHidden
            onContentSizeChange={({ height }) => setInputHeight(height)}
            value={post}
            onChangeText={(value) => setPost(value)}
          />
          <View style={styles.sendButton}>
            <FontAwesome name="send" size={24} color={colors.textColor} />
          </View>
        </View>
        <View style={styles.postType}>
          <PostType
            handleSelected={handleSelected}
            type="question"
            selected={postType === "question"}
          >
            Question
          </PostType>
          <PostType
            handleSelected={handleSelected}
            type="gossip"
            selected={postType === "gossip"}
          >
            Gossip
          </PostType>
          <PostType
            handleSelected={handleSelected}
            type="cheater"
            selected={postType === "cheater"}
          >
            Cheater
          </PostType>
        </View>
      </View>
      {content}
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    textAlign: "justify",
    display: "flex",
    justifyContent: "center",
    padding: 20,
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },
  screen: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  formContainer: {
    padding: 10,
  },

  heading: {
    marginBottom: 20,
    backgroundColor: "red",
  },

  inputContainer: {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10,
    flexDirection: "row",
  },
  sendButton: {
    alignSelf: "flex-end",

    padding: 5,
  },
  vSeparator: {
    height: "80%",
    borderWidth: 1,
    borderColor: colors.highlighColor,
    margin: 2,
  },
  postType: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: colors.highlighColor,
    alignSelf: "center",
    marginTop: 10,
  },
});

export const postsScreenOptions = (navData) => {
  return {
    headerTitle: "",

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={
            Platform.OS === "android" ? "user-circle-0" : "user-circle-o"
          }
          iconSize={23}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  loading: state.question.loading,
  error: state.question.error,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen);
