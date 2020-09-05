import {
  INITIATE_USER_LOGIN,
  FAILED_USER_LOGIN,
  FINISH_USER_LOGIN,
  SET_DID_TRY_AL,
  LOGOUT,
} from "../../action-types/user/user-action-types";

const initialState = {
  token: null,
  error: null,
  userId: null,
  loading: false,
  didTryAutoLogin: false,
};

// User auth reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIATE_USER_LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
        didTryAutoLogin: false,
      };
    case FINISH_USER_LOGIN:
      return {
        ...state,
        token: payload.data.token,
        user: payload.data.user.user_id,
        loading: false,
      };
    case FAILED_USER_LOGIN:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case LOGOUT:
      return {
        ...state,
        didTryAutoLogin: true,
        token: null,
        userId: null,
      };

    case SET_DID_TRY_AL:
      return { ...state, didTryAutoLogin: true };
    default:
      return state;
  }
};
