import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Keyboard, TextInput, TouchableNativeFeedback, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import TagInput from 'react-native-tags-input';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { getPermissionsAsync, pickImage, takeImage } from '../../helpers/imageUpload';
import { createGossip } from '../../redux/actions/post/gossip';
import { createQuestion } from '../../redux/actions/post/question';
import CustomButton from '../Button';
import PostType from '../Chip';
import styles from './styles';

const HEIGHT = Dimensions.get("window").height;

const NewPostActionSheet = (props) => {
  const [postType, setPostType] = useState("");
  const [tags, setTags] = useState({
    tag: "",
    tagsArray: [],
  });

  const { activePostType } = props;

  // initialize the post type according to what user has been viewing!
  useEffect(() => {
    setPostType(activePostType);
  }, [activePostType]);

  const {
    question: { loading: loadingQuestion },
    gossip: { loading: loadingGossip },
  } = useSelector((state) => state);

  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const handleSelected = (type) => setPostType(type);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();

  let { getRef } = props;
  let rbSheet = useRef();

  useEffect(() => {
    getPermissionsAsync();
  }, [getPermissionsAsync]);

  const submitHandler = () => {
    let data = {};
    const { tagsArray } = tags;
    let postTags = "";
    postTags = tagsArray.join(",");

    if (tagsArray.length) {
      data.tags = postTags;
    }

    rbSheet.close();
    // if user is not asking a question
    if (postType !== "question") {
      // new post with an image.
      if (image) {
        data = new FormData();
        if (tagsArray.length) {
          data.append("tags", postTags);
        }
        data.append("title", title);
        data.append("gossip_type", postType.toUpperCase());
        data.append("gossip_description", description);
        data.append("image_url", image);

        dispatch(createGossip(data));
      } else {
        // post with no image.
        data = {
          title,
          gossip_description: description,
          type: postType.toUpperCase(),
          tag: postTags,
        };
        dispatch(createGossip(data));
      }
      // if user is asking a question
    } else {
      // question with an image
      if (image) {
        data = new FormData();
        if (postTags.length) {
          data.append("tags", `${postTags}`);
        }
        data.append("title", description);
        data.append("image_url", image);
        dispatch(createQuestion(data));
      } else {
        // question without an image
        data = {
          title: description,
          tags: postTags,
        };
        dispatch(createQuestion(data));
      }
    }
    clearInputs();
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setImage();
    setTags({
      tag: "",
      tagsArray: [],
    });
  };

  return (
    <RBSheet
      ref={(ref) => {
        rbSheet = ref;
        getRef(ref);
      }}
      height={HEIGHT}
      openDuration={10}
      animationType="slide"
      customStyles={{
        container: {
          flex: HEIGHT,
        },
      }}
      onClose={clearInputs}
    >
      <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
        <>
          <View style={styles.actionSheetHeading}>
            <Button
              onPress={() => rbSheet.close()}
              style={styles.closeActionSheet}
            >
              Cancel
            </Button>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <IconButton
                color={colors.primaryColor}
                icon="camera"
                size={32}
                onPress={() => takeImage(setImage)}
                style={{ margin: 0 }}
              />
              <IconButton
                color={colors.primaryColor}
                icon="image"
                size={32}
                style={{ margin: 0 }}
                onPress={() => pickImage(setImage)}
              />
            </View>
            <CustomButton
              style={styles.saveButton}
              labelStyle={{
                fontSize: 12,
                color: colors.whiteColor,
              }}
              onPress={submitHandler}
              loading={loadingGossip || loadingQuestion}
            >
              Post
            </CustomButton>
          </View>

          <View style={{ ...styles.postType, marginTop: 0 }}>
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
          <View style={styles.inputContainer}>
            {postType !== "question" && (
              <TextInput
                placeholder="Title"
                style={{
                  marginTop: 10,
                  width: "90%",
                  alignSelf: "center",
                  paddingLeft: 20,
                  fontWeight: "bold",
                  color: colors.textColor,
                  padding: 10,
                  fontFamily: "open-sans",
                }}
                value={title}
                onChangeText={(value) => setTitle(value)}
                autoFocus
              />
            )}
            <TextInput
              placeholder="content..."
              style={styles.contentInput}
              multiline
              autoFocus
              value={description}
              onChangeText={(value) => setDescription(value)}
            ></TextInput>
          </View>
          <TagInput
            tags={tags}
            placeholder="Tag your post"
            updateState={setTags}
            label="Place comma OR space to add a tag"
            labelStyle={{
              color: colors.textColor,
              fontSize: 14,
            }}
            tagStyle={{
              backgroundColor: "#ddd",
              border: "none",
              borderWidth: 0,
            }}
            containerStyle={{
              backgroundColor: colors.whiteColor,
            }}
            inputStyle={{
              backgroundColor: "#eee",
              borderRadius: 10,
              paddingLeft: 20,
              marginTop: 10,
              color: colors.textColor,
              fontFamily: "open-sans",
            }}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {image && (
              <Image
                source={{ uri: image.uri }}
                style={{ height: 200, width: 200 }}
              />
            )}
          </View>
        </>
      </TouchableNativeFeedback>
    </RBSheet>
  );
};
export default NewPostActionSheet;
