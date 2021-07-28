import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../modules/posts";
import PostList from "../components/PostList";

const PostListContainer = () => {
  const { data, loading, error } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return;
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!data) return null;

  return <PostList posts={data} />;
};

export default PostListContainer;
