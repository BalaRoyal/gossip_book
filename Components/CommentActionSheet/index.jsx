import React, { useRef, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch } from 'react-redux';

import colors from '../../constants/colors';
import { createComment } from '../../redux/actions/post/comment';

const HEIGHT = Dimensions.get("window").height;

const CommentActionSheet = (props) => {
  const { data } = props;
  let rbSheet = useRef();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const submitCommentHandler = () => {
    const destination = !data.gossip_type ? "question" : "gossip";
    if (comment.trim().length) {
      const commentData = new FormData();
      commentData.append("comment", comment);

      dispatch(createComment(data.id, commentData, destination));
    }

    setComment("");
    rbSheet.close();
  };
  return (
    <RBSheet
      ref={(ref) => {
        rbSheet = ref;
        props.getRef(ref);
      }}
      height={70}
      animationType="slide"
    >
      <KeyboardAvoidingView>
        <View style={styles.commentFormContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Add a comment"
            autoFocus={true}
            value={comment}
            onChangeText={(value) => setComment(value)}
          />
          <IconButton
            icon="send"
            color={colors.primaryColor}
            size={30}
            style={{
              alignSelf: "flex-end",
            }}
            onPress={props.handleSubmit}
            disabled={comment.length === 0}
            onPress={submitCommentHandler}
          />
        </View>
      </KeyboardAvoidingView>
    </RBSheet>
  );
};
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#eee",
    fontSize: 16,
    padding: 15,
    width: "80%",
    marginLeft: 10,
    borderRadius: 10,
  },
  commentFormContainer: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    margin: 10,
  },
});
export default CommentActionSheet;
