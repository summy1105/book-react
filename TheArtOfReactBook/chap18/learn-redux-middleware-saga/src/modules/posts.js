import produce from "immer";
import * as api from "../api/posts";
import { call, getContext, put, takeLatest } from "redux-saga/effects";

const GET_POSTS = "GET_POSTS";

const GET_POSTS_START = "GET_POSTS_START";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";

const GET_POST_START = "GET_POST_START";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

const GO_TO_HOME = "posts/GO_TO_HOME";

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({ type: GET_POST, id });
export const goToHome = () => ({ type: GO_TO_HOME });

function* getPostsSaga() {
  yield put({ type: GET_POSTS_START });
  try {
    const posts = yield call(api.getPosts);
    yield put({ type: GET_POSTS_SUCCESS, payload: posts });
  } catch (e) {
    yield put({ type: GET_POSTS_ERROR, payload: e });
  }
}

function* getPostSaga(action) {
  yield put({ type: GET_POST_START });
  try {
    const post = yield call(api.getPostById, action.id); // api.getPostById(action.id)를 의미
    yield put({ type: GET_POST_SUCCESS, payload: post });
  } catch (e) {
    yield put({ type: GET_POST_ERROR, payload: e });
  }
}

function* goToHomeSaga() {
  const history = yield getContext("history");
  history.push("/");
}

export function* postsSaga() {
  yield takeLatest(GET_POSTS, getPostsSaga);
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GO_TO_HOME, goToHomeSaga);
}

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
    case GET_POSTS_START:
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

    case GET_POST_START:
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
