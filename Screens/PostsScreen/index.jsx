import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';

import PostType from '../../Components/Chip';
import ContentCard from '../../Components/ContentCard';
import NewPostActionSheet from '../../Components/NewPostActionSheet';
import colors from '../../constants/colors';
import { fetchGossips } from '../../redux/actions/post/gossip';
import { fetchQuestions } from '../../redux/actions/post/question';
import styles from './styles';

const PostsScreen = (props) => {
  const [postType, setPostType] = useState("question");

  const handleSelected = (type) => {
    setPostType(type);
    if (type === "question") {
      getQuestions();
    } else {
      getGossips();
    }
  };

  const postClickHandler = (data) => {
    props.navigation.navigate("Single", { data });
  };

  const { getQuestions, getGossips } = props;

  useFocusEffect(
    useCallback(() => {
      if (postType === "question") {
        getQuestions();
      } else {
        getGossips();
      }
    }, [getQuestions, getGossips])
  );

  const handleAvatarClick = (user) => {
    props.navigation.navigate("Profile", { user });
  };

  const { loadingQuestions, loadingGossips, questions, gossips } = props;

  let content = (
    <ActivityIndicator
      size="large"
      color={colors.primaryColor}
      style={{ alignSelf: "center" }}
    />
  );

  let rbSheet = useRef();
  const getRef = (ref) => {
    rbSheet = ref;
  };

  const listHeader = (
    <>
      <View style={styles.formContainer}>
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
    </>
  );

  const listFooter = <></>;

  if (!loadingGossips && !loadingQuestions) {
    const gossipList = gossips.filter(
      (gossip) => gossip.gossip_type === postType.toUpperCase()
    );
    content = (
      <FlatList
        ListHeaderComponent={listHeader}
        data={postType === "question" ? questions : gossipList}
        renderItem={({ item, index }) => (
          <ContentCard
            {...item}
            key={index}
            onPostOverview={() => postClickHandler(item)}
            onAvatarClick={handleAvatarClick}
          />
        )}
        keyExtractor={(item) => `${item.id}`}
        ListFooterComponent={listFooter}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <IconButton
        icon="pencil"
        style={styles.floatingButton}
        onPress={() => {
          rbSheet.open();
        }}
      />
      <NewPostActionSheet activePostType={postType} getRef={getRef} />

      {content}
    </View>
  );
};

export const postsScreenOptions = (navData) => {};

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  loadingQuestions: state.question.loading,
  loadingGossips: state.gossip.loading,
  gossips: state.gossip.gossips,
  questionError: state.question.error,
  gossipError: state.gossip.error,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
  getGossips: () => dispatch(fetchGossips()),
});

export const postNavigationOptions = (navData) => ({
  tabBarLabel: "Home",
  tabBarIcon: ({ color }) => (
    <MaterialCommunityIcons name="home" color={color} size={26} />
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen);
