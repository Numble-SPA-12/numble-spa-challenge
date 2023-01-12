import { requestDELETE, requestPOST } from './index';

const createCommentAPI = async (postId, comment) => {
  try {
    const { data } = await requestPOST(`comment/${postId}`, comment);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteCommentAPI = async (id) => {
  try {
    const { code } = await requestDELETE(`comment/${id}`);
    return code;
  } catch (error) {
    console.error(error);
  }
};

export { createCommentAPI, deleteCommentAPI };
