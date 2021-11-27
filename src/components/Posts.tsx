import { Grid } from "@mui/material";
import React, { FC } from "react";
import { PostType } from "../types/types";
import { Post } from "./Post";
import { useAppSelector } from "../redux/store";

type PropsType = {
  onRemove: (id: number) => void;
};

export const Posts: FC<PropsType> = ({ onRemove }) => {
  const posts = useAppSelector<Array<PostType>>((state) => state.posts.posts);

  return (
    <Grid item xs={7}>
      {posts.map((obj, i) => (
        <Post key={i} {...obj} onRemove={onRemove} />
      ))}
    </Grid>
  );
};
