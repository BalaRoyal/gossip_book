import {
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  READ_NOTIFICATIONS_FAILURE,
  READ_NOTIFICATIONS_START,
  READ_NOTIFICATIONS_SUCCESS,
} from '../../action-types/notifications';

const initialState = {
  notifications: [],
  error: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOTIFICATIONS_START:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload.data,
        loading: false,
      };

    case GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };

    case READ_NOTIFICATIONS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case READ_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case READ_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };

    default:
      return state;
  }
};
