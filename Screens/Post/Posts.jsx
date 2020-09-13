import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { connect } from 'react-redux';

import PostType from '../../Components/Chip';
import ContentCard from '../../Components/ContentCard';
import HeaderButton from '../../Components/HeaderButton';
import colors from '../../constants/colors';
import { fetchGossips } from '../../redux/actions/post/gossip';
import { fetchQuestions } from '../../redux/actions/post/question';

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

  useEffect(() => {
    if (postType === "question") {
      getQuestions();
    } else {
      getGossips();
    }
  }, [getQuestions, getGossips]);

  const { loadingQuestions, loadingGossips, questions, gossips } = props;

  let content = (
    <ActivityIndicator
      size="large"
      color={colors.primaryColor}
      style={{ alignSelf: "center" }}
    />
  );

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
          />
        )}
        keyExtractor={(item) => `${item.id}`}
        ListFooterComponent={listFooter}
      />
    );
  }
  return <View style={styles.screen}>{content}</View>;
};
const styles = StyleSheet.create({
  screen: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  heading: {
    flex: 1,
    // backgroundColor: "yellowgreen",
  },
  postType: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#ffff",
  },
  searchBar: {
    flex: 1,
    minWidth: 300,
    backgroundColor: "#eee",
    elevation: 0,
    flexDirection: "row-reverse",
    marginTop: 10,
    marginRight: 10,
    maxWidth: 350,
    paddingLeft: 4,
  },
  searchInput: {
    backgroundColor: "#ccc",
    flexGrow: 1,
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
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <View style={styles.heading}>
        <Searchbar
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          placeholder="search"
        />
      </View>
    ),
  };
};

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