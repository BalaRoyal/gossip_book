import customAxios, { axiosWithAuth } from '../../../custom-axios';
import {
  FAILED_CREATE_QUESTION,
  FAILED_FETCH_QUESTIONS,
  FINISH_CREATE_QUESTION,
  FINISH_FETCH_QUESTIONS,
  GET_QUESTION_BY_ID_FAILURE,
  GET_QUESTION_BY_ID_START,
  GET_QUESTION_BY_ID_SUCCESS,
  INITIATE_CREATE_QUESTION,
  INITIATE_FETCH_QUESTIONS,
  VOTE_QUESTION_FAILURE,
  VOTE_QUESTION_START,
  VOTE_QUESTION_SUCCESS,
} from '../../action-types/post/post-types';

// --START-- CREATE NEW QUESTION

const startCreateQuestion = () => ({
  type: INITIATE_CREATE_QUESTION,
});

const finishCreateQuestion = (data) => ({
  type: FINISH_CREATE_QUESTION,
  payload: {
    data,
  },
});

const createQuestionFailed = (error) => ({
  type: FAILED_CREATE_QUESTION,
  payload: { error },
});

export const createQuestion = (question) => async (dispatch) => {
  try {
    dispatch(startCreateQuestion());
    const { data } = await customAxios.post("/question/questions/", question);
    dispatch(finishCreateQuestion(data));
  } catch (error) {
    dispatch(createQuestionFailed(error));
  }
};

// --END-- CREATE QUESTION

// FETCH QUESTIONS --START--

const startFetchQuestions = () => ({ type: INITIATE_FETCH_QUESTIONS });

const finishFetchQuestion = (data) => ({
  type: FINISH_FETCH_QUESTIONS,
  payload: { data },
});

const fetchQuestionsFailed = (error) => ({
  type: FAILED_FETCH_QUESTIONS,
  payload: { error },
});

export const fetchQuestions = () => async (dispatch) => {
  try {
    dispatch(startFetchQuestions());
    const { data } = await customAxios.get("/question/questions/");
    dispatch(finishFetchQuestion(data));
  } catch (error) {
    dispatch(fetchQuestionsFailed(error));
  }
};

// --END-- FETCH QUESTIONS

// GET QUESTION BY ID

const getQuestionByIdStart = () => ({
  type: GET_QUESTION_BY_ID_START,
});

const getQuestionByIdSuccess = (data) => ({
  type: GET_QUESTION_BY_ID_SUCCESS,
  payload: { data },
});

const getQuestionByIdFailure = (error) => ({
  type: GET_QUESTION_BY_ID_FAILURE,
  payload: { error },
});

export const getQuestionById = (id) => async (dispatch) => {
  try {
    dispatch(getQuestionByIdStart());
    const { data } = await axiosWithAuth.get(`/question/questions/${id}`);
    dispatch(getQuestionByIdSuccess(data));
  } catch (error) {
    dispatch(getQuestionByIdFailure(error));
  }
};

// VOTE QUESTION ACTIONS

const voteQuestionStart = () => ({
  type: VOTE_QUESTION_START,
});

const voteQuestionSuccess = (data) => ({
  type: VOTE_QUESTION_SUCCESS,
  payload: { data },
});

const voteQuestionFailure = (error) => ({
  type: VOTE_QUESTION_FAILURE,
  payload: { error },
});

export const voteQuestion = (questionId, voteData) => async (dispatch) => {
  try {
    dispatch(voteQuestionStart());
    const { data } = await axiosWithAuth.post(
      `/question/questions/${questionId}/votes/`,
      voteData
    );
    dispatch(voteQuestionSuccess(data));
  } catch (error) {
    console.log(error)
    dispatch(voteQuestionFailure(error));
  }
};
