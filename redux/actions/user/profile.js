import { AsyncStorage } from 'react-native';

import { axiosWithAuth } from '../../../custom-axios';
import { toSnakeCase } from '../../../helpers/helper-functions';
import {
  EDIT_USER_PROFILE_START,
  EDIT_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
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
  type: EDIT_PROFgeILE_FAILURE,
  payload: { error },
});

export const editUserProfile = (profileChanges) => async (dispatch) => {
  try {
    dispatch(editProfileStart());
    const userData = await AsyncStorage.getItem("userData");
    const { userId } = JSON.parse(userData);

    const { data } = await axiosWithAuth.patch(
      `/user/profile/${userId}`,
      toSnakeCase(profileChanges)
    );
    dispatch(editProfileSuccess(data));
  } catch (error) {
    dispatch(editProfileFailure(error));
  }
};
