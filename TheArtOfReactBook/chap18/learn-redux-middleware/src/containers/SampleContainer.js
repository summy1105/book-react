import React from "react";
import Sample from "../components/Sample";
import { connect } from "react-redux";
import {
  createActionGetPost,
  createActionGetPostFailure,
  createActionGetPostSuccess,
  createActionGetUsers,
  createActionGetUsersFailure,
  createActionGetUsersSuccess,
} from "../modules/sample";
import * as api from "../lib/api";

const { useEffect } = React;

const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers,
}) => {
  //클래스 형태 컴포넌트였다면 componentDidMount
  useEffect(() => {
    getPost(1);
    getUsers(1);
  }, [getPost, getUsers]);
  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default connect(
  ({ sample }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: sample.loading.GET_POST,
    loadingUsers: sample.loading.GET_USERS,
  }),
  (dispatch) => ({
    getPost: async (id) => {
      dispatch(createActionGetPost());
      try {
        const response = await api.getPost(id);
        dispatch(createActionGetPostSuccess(response.data));
      } catch (e) {
        dispatch(createActionGetPostFailure());
        throw e;
      }
    },
    getUsers: async (id) => {
      dispatch(createActionGetUsers());
      try {
        const response = await api.getUsers(id);
        dispatch(createActionGetUsersSuccess(response.data));
      } catch (e) {
        dispatch(createActionGetUsersFailure());
        throw e;
      }
    },
  })
)(SampleContainer);
