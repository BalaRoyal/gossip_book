import { axiosWithAuth } from '../../../custom-axios';
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_START, CREATE_COMMENT_SUCCESS } from '../../action-types/post/post-types';

const createCommentStart = () => ({ type: CREATE_COMMENT_START });

const createCommentSuccess = (data) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: { data },
});

const createCommentFailure = (error) => ({
  type: CREATE_COMMENT_FAILURE,
  payload: { error },
});

export const createComment = (id, comment, destination = "") => async (
  dispatch
) => {
  try {
    dispatch(createCommentStart());
    const path =
      destination === "question"
        ? `/question/questions/${id}/comments/`
        : `/gossip/gossips/${id}/comments/`;

    const { data } = await axiosWithAuth.post(path, comment);
    dispatch(createCommentSuccess(data));
  } catch (error) {
    dispatch(createCommentFailure(error));
  }
};
