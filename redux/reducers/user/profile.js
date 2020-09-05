import {
  EDIT_USER_PROFILE_FAILURE,
  EDIT_USER_PROFILE_START,
  EDIT_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
} from "../../action-types/user/user-action-types";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_PROFILE_START:
      return { ...state, loading: true, error: null };
    case GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: payload.data };
    case GET_USER_PROFILE_FAILURE:
      return { ...state, loading: false, error: payload.error };
    case EDIT_USER_PROFILE_START:
      return { ...state, loading: true, error: null };
    case EDIT_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: payload.data };
    case EDIT_USER_PROFILE_FAILURE:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
