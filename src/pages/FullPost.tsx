import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Comments } from "../components/Comments";
import React from "react";
import { useAppSelector } from "../redux/store";
import { PostType } from "../types/types";
import { useParams } from "react-router-dom";

export const FullPost = () => {
  const { id } = useParams();

  const post = useAppSelector<PostType>(
    (state) => state.posts.posts.find((obj) => obj.id === id) as PostType
  );

  return (
    <Paper style={{ padding: "40px 60px", marginTop: 30 }}>
      <h1>{post.title}</h1>
      <img style={{ width: "100%", height: 400 }} src={post.imageUrl} alt="" />
      <p>
        <span>{post.text}</span>
      </p>
      <Divider />
      <h3>Комментарии(0)</h3>
      <Comments />
      <Divider />
      <h3>Добавить комментарий</h3>
      <TextField multiline placeholder="Введите текст комментария" fullWidth />
      <br />
      <br />
      <Button color="success" variant="contained" size="large">
        Добавить
      </Button>
    </Paper>
  );
};
