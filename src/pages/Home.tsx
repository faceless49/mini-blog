import { Grid } from "@mui/material";
import { Posts } from "../components/Posts";
import { Comments } from "../components/Comments";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postsApi } from "../api/api";
import { fetchPosts } from "../redux/reducers/posts-reducer";

export const Home: FC<any> = () => {
  const dispatch = useDispatch();

  const removePost = (id: number) => {
    if (window.confirm("Ты реально хочешь это?!")) {
      dispatch({
        type: "REMOVE_POST",
        payload: {
          id,
        },
      });
    }
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Grid className="wrapper" container spacing={2}>
      <Posts onRemove={removePost} />
      <Grid item xs={5}>
        <Comments />
      </Grid>
    </Grid>
  );
};
