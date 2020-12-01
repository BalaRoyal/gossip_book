import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  GET_GOSSIP_BY_ID_FAILURE,
  GET_GOSSIP_BY_ID_START,
  GET_GOSSIP_BY_ID_SUCCESS,
  GET_QUESTION_BY_ID_FAILURE,
  GET_QUESTION_BY_ID_START,
  GET_QUESTION_BY_ID_SUCCESS,
  VOTE_GOSSIP_FAILURE,
  VOTE_GOSSIP_START,
  VOTE_GOSSIP_SUCCESS,
  VOTE_QUESTION_FAILURE,
  VOTE_QUESTION_START,
  VOTE_QUESTION_SUCCESS,
  VOTE_DISABLE,
} from "../../action-types/post/post-types";

const addOrReplaceVoteInstance = (voteList, voteResponse) => {
  const votes = [...voteList];
  const index = votes.findIndex((vote) => vote.id === voteResponse.id);
  if (index !== -1) {
    votes[index] = voteResponse;
  } else {
    votes.push(voteResponse);
  }

  return votes.filter((vote) => vote.vote !== "UNDONE");
};
const initialState = {
  post: {},
  loading: false,
  error: null,
  loadingComments: false,
  voting: false,
  disable: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GOSSIP_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: null,
        post: {},
      };
    case GET_GOSSIP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        post: { ...payload.data },
      };
    case GET_GOSSIP_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    case GET_QUESTION_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: null,
        post: {},
      };
    case GET_QUESTION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        post: { ...payload.data },
      };
    case GET_QUESTION_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case CREATE_COMMENT_START:
      return {
        ...state,
        loadingComments: true,
        error: null,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loadingComments: false,
        post: {
          ...state.post,
          comments: [payload.data, ...state.post.comments],
        },
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        loadingComments: false,
        error: payload.error,
      };
    case VOTE_QUESTION_START:
      return {
        ...state,
        voting: true,
        error: null,
      };
    case VOTE_QUESTION_SUCCESS:
      return {
        ...state,
        voting: false,
        post: {
          ...state.post,
          votes: addOrReplaceVoteInstance(state.post.votes, payload.data),
        },
      };
    case VOTE_QUESTION_FAILURE:
      return {
        ...state,
        voting: false,
        error: payload.error,
      };

    case VOTE_GOSSIP_START:
      return {
        ...state,
        voting: true,
        error: null,
      };
    case VOTE_GOSSIP_SUCCESS:
      return {
        ...state,
        voting: false,
        post: {
          ...state.post,
          votes: addOrReplaceVoteInstance(state.post.votes, payload.data),
        },
      };
    case VOTE_GOSSIP_FAILURE:
      return {
        ...state,
        voting: false,
        error: payload.error,
      };
    case VOTE_DISABLE:
      return {
        ...state,
        disable: false,
      };
    default:
      return state;
  }
};
