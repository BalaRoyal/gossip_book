import { axiosWithAuth } from '../../../custom-axios';
import {
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  READ_NOTIFICATIONS_FAILURE,
  READ_NOTIFICATIONS_START,
  READ_NOTIFICATIONS_SUCCESS,
} from '../../action-types/notifications';

// GET UNREAD NOTIFICATIONS
const getNotificationsStart = () => ({
  type: GET_NOTIFICATIONS_START,
});

const getNotificationsSuccess = (data) => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: { data },
});

const getNotificationsFailure = (error) => ({
  type: GET_NOTIFICATIONS_FAILURE,
  payload: { error },
});

export const getUserNotifications = () => async (dispatch) => {
  try {
    dispatch(getNotificationsStart());

    const { data } = await axiosWithAuth.get(
      "/user-notifications/notifications/"
    );

    dispatch(getNotificationsSuccess(data));
  } catch (error) {
    dispatch(getNotificationsFailure(error));
  }
};

// SET USER NOTIFICATION TO READ

const readNotificationStart = () => ({
  type: READ_NOTIFICATIONS_START,
});

const readNotificationSuccess = (data) => ({
  type: READ_NOTIFICATIONS_SUCCESS,
  payload: { data },
});

const readNotificationFailure = (error) => ({
  type: READ_NOTIFICATIONS_FAILURE,
  payload: { error },
});

export const setIsRead = (notificationId) => async (dispatch) => {
  try {
    dispatch(readNotificationStart());
    const { data } = await axiosWithAuth.patch(
      `/user-notifications/notifications/${notificationId}`,
      {
        is_read: true,
      }
    );
    dispatch(readNotificationSuccess(data));
  } catch (error) {
    dispatch(readNotificationFailure(error));
  }
};
