import {
  EDIT_USER_PROFILE_FAILURE,
  EDIT_USER_PROFILE_START,
  EDIT_USER_PROFILE_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_START,
  FOLLOW_USER_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  UPLOAD_USER_IMAGE_FAILURE,
  UPLOAD_USER_IMAGE_START,
  UPLOAD_USER_IMAGE_SUCCESS,
} from '../../action-types/user/user-action-types';

const initialState = {
  profile: {},
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
    case UPLOAD_USER_IMAGE_START:
      return { ...state, loading: true, error: null };
    case UPLOAD_USER_IMAGE_SUCCESS:
      return { ...state, loading: false, profile: payload.data };
    case UPLOAD_USER_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    case FOLLOW_USER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          following: [payload.data, ...state.profile.following],
        },
        loading: false,
      };
    case FOLLOW_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};
