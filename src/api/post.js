import { requestDELETE, requestGET, requestPATCH, requestPOST } from './index';

const getPostsAPI = async () => {
  try {
    const { data } = await requestGET('posts');
    const { posts } = data;
    return posts;
  } catch (error) {
    console.error(error);
  }
};

const getPostAPI = async (id) => {
  try {
    const { data } = await requestGET(`post/${id}`);
    const { post } = data;
    return post;
  } catch (error) {
    console.error(error);
  }
};

const createPostAPI = async (postInfo) => {
  try {
    const { data } = await requestPOST('post', postInfo);
    const { post } = data;
    return post;
  } catch (error) {
    console.error(error);
  }
};

const updatePostAPI = async (id, postInfo) => {
  try {
    const { data } = await requestPATCH(`post/${id}`, postInfo);
    const { post } = data;
    return post;
  } catch (error) {
    console.error(error);
  }
};

const deletePostAPI = async (id) => {
  try {
    const { code } = await requestDELETE(`post/${id}`);
    return code;
  } catch (error) {
    console.error(error);
  }
};

export { getPostsAPI, getPostAPI, createPostAPI, updatePostAPI, deletePostAPI };
