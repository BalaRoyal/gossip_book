import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AnswerCard from '../../Components/AnswerCard';
import { getUserGossipComments, getUserQuestionAnswers } from '../../redux/actions/user/answers';
import styles from './styles';

const AnswerScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserGossipComments());
    dispatch(getUserQuestionAnswers());
  }, [dispatch]);

  const { loading, answers, comments } = useSelector(
    ({ userAnswers }) => userAnswers
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={styles.screen}
          data={answers.concat(comments)}
          renderItem={({ item, index }) => <AnswerCard {...item} key={index} />}
          keyExtractor={(item) => `${item.id}`}
        />
      )}
    </View>
  );
};

export const answerScreenOptions = (navData) => ({
  tabBarLabel: "Answers",
  tabBarIcon: ({ color }) => (
    <MaterialIcons name="question-answer" color={color} size={26} />
  ),
});

export default AnswerScreen;
