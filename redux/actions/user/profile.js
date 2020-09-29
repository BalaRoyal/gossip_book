import AsyncStorage from '@react-native-community/async-storage';

import { axiosWithAuth } from '../../../custom-axios';
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

// FOLLOW USER

const followUserStart = () => ({
  type: FOLLOW_USER_START,
});

const followUserSuccess = (data) => ({
  type: FOLLOW_USER_SUCCESS,
  payload: { data },
});

const followUserFailure = (error) => ({
  type: FOLLOW_USER_FAILURE,
  payload: { error },
});

export const followUser = (userId) => async (dispatch) => {
  try {
    dispatch(followUserStart());

    const userData = await AsyncStorage.getItem("userData");
    const { userId: followerId } = JSON.parse(userData);

    const formData = new FormData();
    formData.append("user", followerId);

    const { data } = await axiosWithAuth.post(
      `/user/profile/${userId}/followers/`
    );
    dispatch(followUserSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(followUserFailure(error));
  }
};
