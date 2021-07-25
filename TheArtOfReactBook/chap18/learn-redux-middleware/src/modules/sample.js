import produce from "immer";

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

export const createActionGetPost = () => ({ type: GET_POST });
export const createActionGetPostSuccess = (post) => ({
  type: GET_POST_SUCCESS,
  post,
});
export const createActionGetPostFailure = () => ({ type: GET_POST_FAILURE });

export const createActionGetUsers = () => ({ type: GET_USERS });
export const createActionGetUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  users,
});
export const createActionGetUsersFailure = () => ({ type: GET_USERS_FAILURE });

const initialState = {
  loading: {
    isGetPost: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
};

//reducer
function sample(state = initialState, action) {
  switch (action.type) {
    case GET_POST: //요청시작
      return produce(state, (draft) => {
        draft.loading.GET_POST = true;
      });
    case GET_POST_SUCCESS: //요청완료
      return produce(state, (draft) => {
        draft.loading.GET_POST = false;
        draft.post = action.post; ////추후 입력값 수정
      });
    case GET_POST_FAILURE:
      return produce(state, (draft) => {
        draft.loading.GET_POST = false;
      });

    case GET_USERS:
      return produce(state, (draft) => {
        draft.loading.GET_USERS = true; //요청시작
      });
    case GET_USERS_SUCCESS:
      return produce(state, (draft) => {
        draft.loading.GET_USERS = false;
        draft.users = action.users;
      });
    case GET_USERS_FAILURE:
      return produce(state, (draft) => {
        draft.loading.GET_USERS = false;
      });
    default:
      return state;
  }
}

export default sample;
