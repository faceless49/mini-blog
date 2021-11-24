import React from "react";
import { Grid } from "@mui/material";
import { Comments } from "./components/Comments";
import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { PostType } from "./types/types";

type AddPostType = {
  type: "ADD_POST";
  payload: PostType;
};
type RemovePostType = {
  type: "REMOVE_POST";
  payload: {
    id: number;
  };
};
type ActionType = AddPostType | RemovePostType;
type PostsStateType = {
  posts: Array<PostType>;
  comments: Array<string>;
  searchValue: string;
};

const initState = {} as PostsStateType;

function appReducer(state = initState, action: ActionType): PostsStateType {
  console.log(state, action);

  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter(
          (obj: PostType) => obj.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = React.useReducer(appReducer, {
    posts: [
      {
        id: 1,
        title: "Тестовая статья",
        imageUrl:
          "https://images.unsplash.com/photo-1636132644036-79b25423bce9?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        text: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      },
      {
        id: 2,
        title: "Это вторая статья",
        imageUrl:
          "https://images.unsplash.com/photo-1636145172911-5e06fce746d5?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Mnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        text: "йцуйцулд фыв аофыолдво лдфыолдвфолдывл",
      },
    ],
    comments: [],
    searchValue: "",
  });

  const addPost = () => {
    dispatch({
      type: "ADD_POST",
      payload: {
        id: 3,
        title: "Третья статья",
        imageUrl:
          "https://images.unsplash.com/photo-1636145411033-41bb1b898d5c?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2Nnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        text: "йцу 1231231 уйц йц123123!!!",
      },
    });
  };

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

  return (
    <div className="App">
      <Header onAddPost={addPost} />
      <Grid className="wrapper" container spacing={2}>
        <Grid item xs={7}>
          {state.posts.map((obj, i) => (
            <Post key={i} {...obj} onRemove={removePost} />
          ))}
        </Grid>
        <Grid item xs={5}>
          <Comments />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
