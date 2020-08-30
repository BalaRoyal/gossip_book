import { axiosWithAuth } from '../../../custom-axios';
import {
  FAILED_CREATE_GOSSIP,
  FAILED_FETCH_GOSSIPS,
  FINISH_CREATE_GOSSIP,
  FINISH_FETCH_GOSSIPS,
  GET_GOSSIP_BY_ID_FAILURE,
  GET_GOSSIP_BY_ID_START,
  GET_GOSSIP_BY_ID_SUCCESS,
  INITIATE_CREATE_GOSSIP,
  INITIATE_FETCH_GOSSIPS,
} from '../../action-types/post/post-types';

// --START-- CREATE NEW GOSSIP

const startCreateGossip = () => ({
  type: INITIATE_CREATE_GOSSIP,
});

const finishCreateGossip = (data) => ({
  type: FINISH_CREATE_GOSSIP,
  payload: { data },
});

const createGossipFailed = (error) => ({
  type: FAILED_CREATE_GOSSIP,
  payload: { error },
});

export const createGossip = (gossipData) => async (dispatch) => {
  try {
    dispatch(startCreateGossip());
    const { data } = await axiosWithAuth.post("/gossip/gossips/", gossipData);
    dispatch(finishCreateGossip(data));
  } catch (error) {
    dispatch(createGossipFailed(error));
  }
};

// --END-- CREATE NEW GOSSIP

// --START-- FETCH GOSSIPS

const startFetchGossips = () => ({ type: INITIATE_FETCH_GOSSIPS });

const finishFetchGossips = (data) => ({
  type: FINISH_FETCH_GOSSIPS,
  payload: { data },
});

const fetchGossipsFailed = (error) => ({
  type: FAILED_FETCH_GOSSIPS,
  payload: { error },
});

export const fetchGossips = () => async (dispatch) => {
  try {
    dispatch(startFetchGossips());
    const { data } = await axiosWithAuth.get("/gossip/gossips/");
    dispatch(finishFetchGossips(data));
  } catch (error) {
    dispatch(fetchGossipsFailed(error));
  }
};
// --END-- FETCH GOSSIPS

// FETCH SINGLE GOSSIP BY ID

const getGossipByIdStart = () => ({
  type: GET_GOSSIP_BY_ID_START,
});

const getGossipByIdSuccess = (data) => ({
  type: GET_GOSSIP_BY_ID_SUCCESS,
  payload: { data },
});

const getGossipByIdFailure = (error) => ({
  type: GET_GOSSIP_BY_ID_FAILURE,
  payload: { error },
});

export const getGossipById = (id) => async (dispatch) => {
  try {
    dispatch(getGossipByIdStart());
    const { data } = await axiosWithAuth.get(`/gossip/gossips/${id}`);
    dispatch(getGossipByIdSuccess(data));
  } catch (error) {
    dispatch(getGossipByIdFailure(error));
  }
};
