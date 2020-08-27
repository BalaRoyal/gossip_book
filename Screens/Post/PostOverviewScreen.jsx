import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import Comment from '../../Components/Comment';
import ContentCard from '../../Components/ContentCard';
import colors from '../../constants/colors';
import { createComment } from '../../redux/actions/post/comment';

const PostOverviewScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const submitCommentHandler = () => {
    const destination = !data.gossip_type ? "question" : "gossip";
    if (comment.trim().length) {
      dispatch(createComment(data.id, { comment }, destination));
    }
    setComment("");
  };

  return (
    <KeyboardAwareFlatList
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      enableAutomaticScroll={true}
      enableOnAndroid={true}
      ListHeaderComponent={
        <View style={styles.screen}>
          <ContentCard {...data} />
          <View style={styles.form}>
            <View style={styles.buttons}>
              <Button
                theme={{
                  colors: {
                    primary: "green",
                    accent: "green",
                  },
                }}
                labelStyle={styles.buttonLabelStyle}
                icon={({ color }) => (
                  <FontAwesome5 name="check" color={color} size={16} />
                )}
                style={styles.voteButton}
              >
                True
              </Button>
              <Button
                labelStyle={styles.buttonLabelStyle}
                icon={({ size, color }) => (
                  <FontAwesome5 name="times-circle" color={color} size={16} />
                )}
                style={styles.voteButton}
              >
                False
              </Button>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={comment}
                onChangeText={(value) => setComment(value)}
                style={styles.input}
                placeholder="answer or comment"
                multiline
              />
              <FontAwesome
                name="send"
                style={styles.sendIcon}
                size={24}
                color={colors.textColor}
                onPress={submitCommentHandler}
              />
            </View>
          </View>
        </View>
      }
      data={data.comments}
      renderItem={({ index, item }) => <Comment {...item} key={index} />}
      keyExtractor={(item) => `${item.id}`}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffffff",
    display: "flex",
    flex: 1,
    paddingTop: 10,
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
    paddingTop: 2,
    paddingBottom: 2,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  inputContainer: {
    flex: 1,
    borderRadius: 20,
    flexDirection: "row",
    borderColor: "#eeee",
    borderWidth: 1,
    marginRight: 3,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingLeft: 10,
    maxHeight: 100,
  },
  sendIcon: {
    marginRight: 10,
    padding: 3,
    alignSelf: "flex-end",
  },
  voteButton: {
    width: 60,
  },
  buttonLabelStyle: { fontSize: 10, marginLeft: 6, fontWeight: "bold" },
});

export default PostOverviewScreen;
