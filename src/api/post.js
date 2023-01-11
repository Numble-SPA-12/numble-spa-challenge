import { get, patch, post, remove } from './index';

const getPostsAPI = async () => {
  try {
    const { data } = await get('posts');
    const { posts } = data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

const getPostAPI = async (id) => {
  try {
    const { data } = await get(`posts/${id}`);
    const { post } = data;
    return post;
  } catch (error) {
    console.error(error);
  }
};

const createPostAPI = async (post) => {
  try {
    const { data } = await post('posts', post);
    const { post } = data;
    return post;
  } catch (error) {
    console.error(error);
  }
};

const updatePostAPI = async (id, post) => {
  try {
    const { data } = await patch(`posts/${id}`, post);
    const { post } = data;
    return post;
  } catch (error) {
    console.error(error);
  }
};

const deletePostAPI = async (id) => {
  try {
    const { code } = await remove(`posts/${id}`);
    return code;
  } catch (error) {
    console.error(error);
  }
};

export { getPostsAPI, getPostAPI, createPostAPI, updatePostAPI, deletePostAPI };
