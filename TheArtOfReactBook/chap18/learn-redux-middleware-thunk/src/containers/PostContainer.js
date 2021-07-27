import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { getPost, goToHome } from "../modules/posts";

const PostContainer = ({ postId }) => {
  const { data, loading, error } = useSelector((state) => state.posts.post) || {
    loading: false,
    data: null,
    error: null,
  }; //데이터가 존재하지 않을 때, 오류 방지
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>error...</div>;
  if (!data)
    return <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>home</button>
      <Post post={data} />
    </>
  );
};

export default PostContainer;
