import {
  GET_GOSSIP_COMMENT_FAILURE,
  GET_GOSSIP_COMMENT_START,
  GET_GOSSIP_COMMENT_SUCCESS,
  GET_QUESTION_ANSWER_FAILURE,
  GET_QUESTION_ANSWER_START,
  GET_QUESTION_ANSWER_SUCCESS,
} from '../../action-types/user/user-action-types';

const initialState = {
  loading: false,
  answers: [],
  comments: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GOSSIP_COMMENT_START:
      return { ...state, loading: true, error: null };
    case GET_GOSSIP_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: payload.data,
      };
    case GET_GOSSIP_COMMENT_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };

    case GET_QUESTION_ANSWER_START:
      return { ...state, loading: true, error: null };
    case GET_QUESTION_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
        answers: payload.data,
      };
    case GET_QUESTION_ANSWER_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    default:
      return state;
  }
};
