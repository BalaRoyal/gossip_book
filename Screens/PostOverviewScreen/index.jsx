import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CommentActionSheet from "../../Components/CommentActionSheet";
import Comment from "../../Components/CommentCard";
import ContentCard from "../../Components/ContentCard";
import colors from "../../constants/colors";
import {
  getGossipById,
  voteGossip,
  voteDisable,
} from "../../redux/actions/post/gossip";
import {
  getQuestionById,
  voteQuestion,
} from "../../redux/actions/post/question";
import styles from "./styles";

const PostOverviewScreen = ({ route }) => {
  const { data } = route.params;
  const dispatch = useDispatch();
  let actionSheet = useRef();

  const [hasVoted, setHasVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);
  const [disabled, setDisabled] = useState({});
  const [voteType, setVoteType] = useState(1); // upvote
  // const [clickable, setClickable] = useState(disable);
  const [like, setlike] = useState();
  const [disLike, setDislike] = useState();
  let percentDownVote = 0;
  let percentUpVote = 0;

  const getRef = (ref) => {
    actionSheet = ref;
  };

  const { post, loading, voting, loadingComments, disable } = useSelector(
    ({ postOverview }) => postOverview
  );
  let votes = post.votes;
  const clickable = disable;

  useEffect(() => {
    const { id, gossip_type } = data;
    gossip_type ? dispatch(getGossipById(id)) : dispatch(getQuestionById(id));
    // setClickable(disable);
  }, [data]);

  const handleUpVote = (post) => {
    const fn = post.gossip_type ? voteGossip : voteQuestion;
    setVoteType(1);
    const data = new FormData();
    data.append("vote", "UPVOTE");
    dispatch(fn(post.id, data));

    votes = votes.filter((vote) => vote.vote !== "UNDONE");
    const totalVotess = votes?.length;

    const downVotess = votes.filter((vote) => vote.vote === "DOWNVOTE").length;
    const upVotess = votes.filter((vote) => vote.vote === "UPVOTE").length;

    if (totalVotess !== 0) {
      percentUpVote = parseInt((upVotess * 100) / +totalVotess);
      percentDownVote = parseInt((downVotess * 100) / totalVotess);
      setlike(percentUpVote);
      setDislike(percentDownVote);
    }
  };

  const handleDownVote = (post) => {
    const fn = post.gossip_type ? voteGossip : voteQuestion;
    setVoteType(0);
    const data = new FormData();
    data.append("vote", "DOWNVOTE");
    dispatch(fn(post.id, data));
  };

  const hasData = Object.keys(post).length > 0;
  const { votess } = post;

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const { userId } = JSON.parse(userData);

      if (votess) {
        const postVotess = votess.filter((vote) => vote.vote !== "UNDONE");
        const voteIndex = postVotess.findIndex(
          (vote) => vote.vote === "UPVOTE" && vote.voted_by === userId
        );
        const downVoteIndex = postVotess.findIndex(
          (vote) => vote.vote === "DOWNVOTE" && vote.voted_by === userId
        );

        if (voteIndex !== -1) {
          console.log(voteIndex, votess[voteIndex]);
          setHasVoted(true);
        }

        if (downVoteIndex !== -1) {
          setHasDownVoted(true);
        }
      }
    };

    getUser();
  }, [votess]);

  useEffect(() => {
    if (voting) {
      setDisabled({ disabled: true });
    } else {
      setDisabled({});
    }
  }, [voting]);

  if (loading) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" color={colors.primaryColor} />
      </View>
    );
  }

  return (
    <>
      {hasData && (
        <>
          <FlatList
            style={{
              flex: 1,
              backgroundColor: "#fff",
            }}
            enableAutomaticScroll={true}
            enableOnAndroid={true}
            ListHeaderComponent={
              <View>
                <ContentCard {...post} hasVoted={hasVoted || hasDownVoted} />
                <View style={styles.form}>
                  <View style={styles.buttons}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Button
                        theme={{
                          colors: {
                            primary: "green",
                            accent: "green",
                          },
                        }}
                        onPress={() => {
                          clickable
                            ? post.gossip_description
                              ? Alert.alert(
                                  "Alert",
                                  "You won't be change this again, Do you want to submit (Yes-No)",
                                  [
                                    {
                                      text: "No",
                                      onPress: () =>
                                        console.log("Cancel Pressed!"),
                                    },
                                    {
                                      text: "Yes",
                                      onPress: () => {
                                        dispatch(voteDisable());
                                        handleUpVote(post);
                                      },
                                    },
                                  ],
                                  { cancelable: false }
                                )
                              : !post.gossip_description
                              ? handleUpVote(post)
                              : null
                            : null;
                        }}
                        labelStyle={styles.buttonLabelStyle}
                        icon={({ color }) =>
                          !post.gossip_description ? (
                            <View style={{ flexDirection: "row" }}>
                              <AntDesign name="like2" color={color} size={16} />
                              <Text>{like}</Text>
                            </View>
                          ) : (
                            // <Text>vansh</Text>
                            <FontAwesome5
                              name="check"
                              color={color}
                              size={16}
                            />
                          )
                        }
                        style={styles.voteButton}
                        loading={voting && voteType === 1}
                        {...disabled}
                      >
                        {!post.gossip_description ? "" : "True"}
                      </Button>
                      <Button
                        labelStyle={styles.buttonLabelStyle}
                        loading={voting && voteType === 0}
                        {...disabled}
                        icon={({ size, color }) =>
                          !post.gossip_description ? (
                            <View style={{ flexDirection: "row" }}>
                              <AntDesign
                                name="dislike2"
                                color={color}
                                size={16}
                              />
                              <Text>{disLike}</Text>
                            </View>
                          ) : (
                            <FontAwesome5
                              name="times-circle"
                              color={color}
                              size={16}
                            />
                          )
                        }
                        style={styles.voteButton}
                        onPress={() => {
                          clickable
                            ? post.gossip_description
                              ? Alert.alert(
                                  "Alert",
                                  "You won't be change this again, Do you want to submit (Yes-No)",
                                  [
                                    {
                                      text: "No",
                                      onPress: () =>
                                        console.log("Cancel Pressed!"),
                                    },
                                    {
                                      text: "Yes",
                                      onPress: () => {
                                        dispatch(voteDisable());
                                        handleDownVote(post);
                                      },
                                    },
                                  ],
                                  { cancelable: false }
                                )
                              : !post.gossip_description
                              ? handleDownVote(post)
                              : null
                            : null;
                        }}
                      >
                        {!post.gossip_description ? "" : "False"}
                      </Button>
                    </View>

                    <Button
                      loading={loadingComments}
                      labelStyle={{
                        fontSize: 12,
                        color: "#333",
                      }}
                      icon={({ size, color }) => (
                        <FontAwesome5 name="comment" color="#333" size={16} />
                      )}
                      style={styles.voteButton}
                      onPress={() => actionSheet.open()}
                    >
                      {post.gossip_description ? "Comment" : "Answer"}
                    </Button>
                  </View>
                </View>
              </View>
            }
            data={post.comments}
            renderItem={({ index, item }) => <Comment {...item} key={index} />}
            keyExtractor={(item) => `${item.id}`}
            ListFooterComponent={
              post.comments && post?.comments?.length === 0 ? (
                <View style={styles.noContent}>
                  <Text>Be the first one to say something! </Text>
                </View>
              ) : null
            }
          />

          <CommentActionSheet getRef={getRef} data={data} />
        </>
      )}
    </>
  );
};
// PostOverviewScreen.propTypes = {
//   votess: PropTypes.array.isRequired,
// };

export default PostOverviewScreen;
