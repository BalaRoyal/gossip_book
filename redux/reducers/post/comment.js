import {
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
} from "../../action-types/post/post-types";

const initialState = {
  comment: null,
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_COMMENT_START:
      return { ...state, loading: true, error: null, comment: "null" };
    case CREATE_COMMENT_SUCCESS:
      return { ...state, comment: payload.data, loading: false };
    case CREATE_COMMENT_FAILURE:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
