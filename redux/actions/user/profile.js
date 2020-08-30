import { AsyncStorage } from 'react-native';

import { axiosWithAuth } from '../../../custom-axios';
import {
  EDIT_USER_PROFILE_FAILURE,
  EDIT_USER_PROFILE_START,
  EDIT_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  UPLOAD_USER_IMAGE_FAILURE,
  UPLOAD_USER_IMAGE_START,
  UPLOAD_USER_IMAGE_SUCCESS,
} from '../../action-types/user/user-action-types';

// GET USER PROFILE
const getProfileStart = () => ({ type: GET_USER_PROFILE_START });

const getProfileSuccess = (data) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: { data },
});

const getProfileFailure = (error) => ({
  type: GET_USER_PROFILE_FAILURE,
  payload: { error },
});

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch(getProfileStart());

    if (!id) {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      id = transformedData.userId;
    }

    const { data } = await axiosWithAuth.get(`/user/profile/${id}`);
    dispatch(getProfileSuccess(data));
  } catch (error) {
    dispatch(getProfileFailure(error));
  }
};

// EDIT USER PROFILE

const editProfileStart = () => ({
  type: EDIT_USER_PROFILE_START,
});

const editProfileSuccess = (data) => ({
  type: EDIT_USER_PROFILE_SUCCESS,
  payload: { data },
});

const editProfileFailure = (error) => ({
  type: EDIT_USER_PROFILE_FAILURE,
  payload: { error },
});

export const editUserProfile = (profileChanges) => async (dispatch) => {
  try {
    dispatch(editProfileStart());
    const userData = await AsyncStorage.getItem("userData");
    const { userId } = JSON.parse(userData);

    const { data } = await axiosWithAuth.patch(
      `/user/profile/${userId}`,
      profileChanges
    );
    dispatch(editProfileSuccess(data));
  } catch (error) {
    dispatch(editProfileFailure(error));
  }
};

// Add profile image

const addProfileImageStart = () => ({
  type: UPLOAD_USER_IMAGE_START,
});

const addProfileImageSuccess = (data) => ({
  type: UPLOAD_USER_IMAGE_SUCCESS,
  payload: { data },
});

const addProfileImageFailed = (error) => ({
  type: UPLOAD_USER_IMAGE_FAILURE,
  payload: { error },
});

export const uploadProfileImage = (formData) => async (dispatch) => {
  try {
    dispatch(addProfileImageStart());

    // get Current user ID
    const userData = await AsyncStorage.getItem("userData");
    const { userId } = JSON.parse(userData);

    const { data } = await axiosWithAuth.patch(
      `/user/profile/${userId}`,
      formData
    );
    dispatch(addProfileImageSuccess(data));
  } catch (error) {
    dispatch(addProfileImageFailed(error));
  }
};
