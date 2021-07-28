import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { coutnerSaga } from "./counter";
import posts, { postsSaga } from "./posts";

const rootReducer = combineReducers({ counter, posts });
export function* rootSaga() {
  yield all([coutnerSaga(), postsSaga()]); //all은 배열 안의 여러 사가를 동시에 실행시켜 줍니다.
}

export default rootReducer;
