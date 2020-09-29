import {
  FAILED_CREATE_QUESTION,
  FAILED_FETCH_QUESTIONS,
  FINISH_CREATE_QUESTION,
  FINISH_FETCH_QUESTIONS,
  INITIATE_CREATE_QUESTION,
  INITIATE_FETCH_QUESTIONS,
} from '../../action-types/post/post-types';

const initialState = {
  questions: [],
  error: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIATE_CREATE_QUESTION:
      return { ...state, loading: true, error: null };

    case FINISH_CREATE_QUESTION:
      return {
        ...state,
        loading: false,
        questions: state.questions.concat(payload.data),
      };

    case FAILED_CREATE_QUESTION:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    case INITIATE_FETCH_QUESTIONS:
      return { ...state, loading: true, error: null };

    case FINISH_FETCH_QUESTIONS:
      return { ...state, questions: payload.data, loading: false };

    case FAILED_FETCH_QUESTIONS:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
};
