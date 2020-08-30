import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import CommentActionSheet from '../../Components/CommentActionSheet';
import Comment from '../../Components/CommentCard';
import ContentCard from '../../Components/ContentCard';
import colors from '../../constants/colors';
import { getGossipById } from '../../redux//actions/post/gossip';
import { getQuestionById } from '../../redux//actions/post/question';
import styles from './styles';

const PostOverviewScreen = ({ route }) => {
  const { data } = route.params;

  const dispatch = useDispatch();
  let actionSheet = useRef();

  const getRef = (ref) => {
    actionSheet = ref;
  };

  const { post, loading } = useSelector(({ postOverview }) => postOverview);

  useEffect(() => {
    const { id, gossip_type } = data;
    gossip_type ? dispatch(getGossipById(id)) : dispatch(getQuestionById(id));
  }, [data]);

  const hasData = Object.keys(post).length > 0;

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
                <ContentCard {...post} />
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
                          <FontAwesome5
                            name="times-circle"
                            color={color}
                            size={16}
                          />
                        )}
                        style={styles.voteButton}
                      >
                        False
                      </Button>
                    </View>

                    <Button
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
                      Comment
                    </Button>
                  </View>
                </View>
              </View>
            }
            data={post.comments}
            renderItem={({ index, item }) => <Comment {...item} key={index} />}
            keyExtractor={(item) => `${item.id}`}
          />

          <CommentActionSheet getRef={getRef} data={data} />
        </>
      )}
    </>
  );
};

export default PostOverviewScreen;
