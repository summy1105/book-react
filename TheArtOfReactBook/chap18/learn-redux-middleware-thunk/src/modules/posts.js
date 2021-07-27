import * as postsAPI from "../api/posts";
import { produce } from "immer";
import { createPromiseThunk } from "../lib/asyncUtils";

const GET_POSTS = "posts/GET_POSTS";
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "posts/GET_POSTS_ERROR";

const GET_POST = "posts/GET_POST";
const GET_POST_SUCCESS = "posts/GET_POST_SUCCESS";
const GET_POST_ERROR = "posts/GET_POST_ERROR";

export const goToHome =
  () =>
  (dispatch, getState, { history }) => {
    history.push("/");
  };

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);

export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

const initialState = {
  posts: {
    loading: false,
    data: null,
    error: null,
  },
  post: {
    loading: false,
    data: null,
    error: null,
  },
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return produce(state, (draft) => {
        draft.posts.loading = true;
      });
    case GET_POSTS_SUCCESS:
      return produce(state, (draft) => {
        draft.posts.loading = false;
        draft.posts.data = action.payload;
      });
    case GET_POSTS_ERROR:
      return produce(state, (draft) => {
        draft.posts.loading = true;
        draft.posts.error = action.payload;
      });

    case GET_POST:
      return produce(state, (draft) => {
        draft.post.loading = true;
      });
    case GET_POST_SUCCESS:
      return produce(state, (draft) => {
        draft.post.loading = false;
        draft.post.data = action.payload;
      });
    case GET_POST_ERROR:
      return produce(state, (draft) => {
        draft.post.loading = true;
        draft.post.error = action.payload;
      });
    default:
      return state;
  }
}
