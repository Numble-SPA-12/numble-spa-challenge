const createCommentAPI = async (postId, comment) => {
  try {
    const { data } = await post(`comment/${postId}`, comment);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteCommentAPI = async (id) => {
  try {
    const { code } = await remove(`comment/${id}`);
    return code;
  } catch (error) {
    console.error(error);
  }
};
