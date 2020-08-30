import {
  FAILED_CREATE_GOSSIP,
  FAILED_FETCH_GOSSIPS,
  FINISH_CREATE_GOSSIP,
  FINISH_FETCH_GOSSIPS,
  INITIATE_CREATE_GOSSIP,
  INITIATE_FETCH_GOSSIPS,
} from '../../action-types/post/post-types';

const initialState = {
  gossips: [],
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIATE_CREATE_GOSSIP:
      return { ...state, loading: true, error: null };
    case FINISH_CREATE_GOSSIP:
      return {
        ...state,
        loading: false,
        gossips: state.gossips.concat(payload.data),
      };

    case FAILED_CREATE_GOSSIP:
      return { ...state, error: payload.error, loading: false };

    case INITIATE_FETCH_GOSSIPS:
      return { ...state, loading: true, error: null };

    case FINISH_FETCH_GOSSIPS:
      return { ...state, gossips: payload.data, loading: false };

    case FAILED_FETCH_GOSSIPS:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
};
