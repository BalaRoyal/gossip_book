import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  GET_GOSSIP_BY_ID_FAILURE,
  GET_GOSSIP_BY_ID_START,
  GET_GOSSIP_BY_ID_SUCCESS,
  GET_QUESTION_BY_ID_FAILURE,
  GET_QUESTION_BY_ID_START,
  GET_QUESTION_BY_ID_SUCCESS,
} from '../../action-types/post/post-types';

const initialState = {
  post: {},
  loading: false,
  error: null,
  loadingComments: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GOSSIP_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: null,
        post: {},
      };
    case GET_GOSSIP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        post: { ...payload.data },
      };
    case GET_GOSSIP_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    case GET_QUESTION_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: null,
        post: {},
      };
    case GET_QUESTION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        post: { ...payload.data },
      };
    case GET_QUESTION_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case CREATE_COMMENT_START:
      return {
        ...state,
        loadingComments: true,
        error: null,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loadingComments: false,
        post: {
          ...state.post,
          comments: [payload.data, ...state.post.comments],
        },
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        loadingComments: false,
        error: payload.error,
      };
    default:
      return state;
  }
};
