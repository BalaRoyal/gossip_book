import {
  INITIATE_USER_LOGIN,
  FINISH_USER_LOGIN,
  FAILED_USER_LOGIN,
  SET_DID_TRY_AL,
  LOGOUT,
} from "../action-types/user/user-action-types";

import jwtDecode from "jwt-decode";

import { AsyncStorage } from "react-native";
import axios from "../../custom-axios";

// Initiate user login action
const initUserLogin = () => ({ type: INITIATE_USER_LOGIN });
let timer;
const setLogoutTimer = (expirationTime) => (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

export const authenticate = (userId, token, expiryTime) => async (dispatch) => {
  dispatch(setLogoutTimer(expiryTime));
  dispatch({
    type: FINISH_USER_LOGIN,
    payload: { data: { user: { id: userId }, token: token } },
  });
};

// Finish user login action
const finishUserLogin = (data) => {
  return {
    type: FINISH_USER_LOGIN,
    payload: { data },
  };
};

// Failed user login action
const userLoginFailed = (error) => ({
  type: FAILED_USER_LOGIN,
  payload: { error },
});

//==========================================================

// AUTO LOGIN

export const setDidTryAL = () => ({
  type: SET_DID_TRY_AL,
});

// --END--- AUTO LOGIN

// =======================================================

// user login action creator
export const login = (accessToken, loginMethod) => async (dispatch) => {
  try {
    dispatch(initUserLogin());
    const { data } = await axios.post(`/user/auth/${loginMethod}/`, {
      access_token: accessToken,
    });

    const decodedToken = jwtDecode(data.token);
    // console.log(decodedToken);
    console.log(data.user.user_id);
    dispatch(finishUserLogin(data));
    dispatch(setLogoutTimer(decodedToken.exp * 1000));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(decodedToken.exp) * 1000
    );

    saveDataToStorage(data.token, decodedToken.user_id, expirationDate);
  } catch (error) {
    console.log(error);
    dispatch(userLoginFailed(error));
  }
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
