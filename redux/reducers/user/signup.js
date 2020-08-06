import {
  INITIATE_USER_REGISTRATION,
  FAILED_USER_REGISTRATION,
  FINISH_USER_REGISTRATION,
} from "../../action-types/user/user-action-types";

const initialState = {
  userAccount: null,
  loading: true,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIATE_USER_REGISTRATION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FINISH_USER_REGISTRATION:
      return {
        ...state,
        userAccount: payload.data,
        loading: false,
      };
    case FAILED_USER_REGISTRATION:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    default:
      return state;
  }
};
