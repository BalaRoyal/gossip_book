import {
  INITIATE_USER_REGISTRATION,
  FINISH_USER_REGISTRATION,
  FAILED_USER_REGISTRATION,
} from "../action-types/user/user-action-types";

import axios from "../../custom-axios";

const initUserRegistration = () => ({
  type: INITIATE_USER_REGISTRATION,
});

const finishUserRegistration = (data) => ({
  type: FINISH_USER_REGISTRATION,
  payload: { data },
});

const userRegFailed = (error) => ({
  type: FAILED_USER_REGISTRATION,
  payload: { error },
});

export const createUserAccount = (data) => async (dispatch) => {
  try {
    dispatch(initUserRegistration());
    const { data } = await axios.post("/user/list", data);
    dispatch(finishUserRegistration(data));
  } catch (error) {
    dispatch(userRegFailed(error));
  }
};
