import {
  INITIATE_CREATE_QUESTION,
  FINISH_CREATE_QUESTION,
  FAILED_CREATE_QUESTION,
  INITIATE_FETCH_QUESTIONS,
  FINISH_FETCH_QUESTIONS,
  FAILED_FETCH_QUESTIONS,
} from "../../action-types/post/post-types";

import customAxios, { axiosWithAuth } from "../../../custom-axios";

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
    const { data } = axiosWithAuth.post("/question/questions/", question);
    console.log(data);
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
