import { axiosWithAuth } from '../../../custom-axios';
import {
  GET_GOSSIP_COMMENT_FAILURE,
  GET_GOSSIP_COMMENT_START,
  GET_GOSSIP_COMMENT_SUCCESS,
  GET_QUESTION_ANSWER_FAILURE,
  GET_QUESTION_ANSWER_START,
  GET_QUESTION_ANSWER_SUCCESS,
} from '../../action-types/user/user-action-types';

// ANSWERS ON USER QUESTIONS

const getQuestionAnswerStart = () => ({
  type: GET_QUESTION_ANSWER_START,
});

const getQuestionAnswerSuccess = (data) => ({
  type: GET_QUESTION_ANSWER_SUCCESS,
  payload: { data },
});

const getQuestionAnswerFailure = (error) => ({
  type: GET_QUESTION_ANSWER_FAILURE,
  payload: { error },
});

export const getUserQuestionAnswers = () => async (dispatch) => {
  try {
    dispatch(getQuestionAnswerStart());
    const { data } = await axiosWithAuth.get("/user/answers/");
    dispatch(getQuestionAnswerSuccess(data));
  } catch (error) {
    dispatch(getQuestionAnswerFailure());
  }
};

//  COMMENTS ON USER GOSSIP
const getGossipCommentStart = () => ({
  type: GET_GOSSIP_COMMENT_START,
});

const getGossipCommentSuccess = (data) => ({
  type: GET_GOSSIP_COMMENT_SUCCESS,
  payload: { data },
});

const getGossipCommentFailure = (error) => ({
  type: GET_GOSSIP_COMMENT_FAILURE,
  payload: { error },
});

export const getUserGossipComments = () => async (dispatch) => {
  try {
    dispatch(getGossipCommentStart());
    const { data } = await axiosWithAuth.get("/user/comments/");
    dispatch(getGossipCommentSuccess(data));
  } catch (error) {
    dispatch(getGossipCommentFailure());
  }
};
