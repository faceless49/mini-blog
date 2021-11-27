import { PostType } from "../../types/types";
import { AppRootStateType } from "../store";
import { ThunkAction } from "redux-thunk";
import { postsApi } from "../../api/api";

const initState: PostsStateType = {
  posts: [],
};

export function postsReducer(
  state = initState,
  action: ActionsType
): PostsStateType {
  switch (action.type) {
    case "ADD-POST":
      return {
        ...state,
        posts: [...state.posts, action.post],
      };
    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter(
          (obj: PostType) => obj.id !== action.payload.id
        ),
      };
    case "SET-POSTS":
      return { posts: action.posts.map((p) => ({ ...p })) };
    default:
      return state;
  }
}

// Action Creators
export const removePostAC = (id: number) => {
  return {
    type: "REMOVE_POST",
    payload: {
      id,
    },
  } as const;
};
export const setPostsAC = (posts: Array<PostType>) =>
  ({ type: "SET-POSTS", posts } as const);
export const addPostAC = (post: PostType) =>
  ({ type: "ADD-POST", post } as const);

// Thunks

type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>;

export const addPostTC = (): ThunkType => (dispatch) => {
  postsApi.createPost().then((res) => {
    let post = res.data;
    dispatch(addPostAC(post));
  });
};

export const fetchPosts = (): ThunkType => (dispatch) => {
  postsApi.getPosts().then((res) => {
    dispatch(setPostsAC(res.data));
  });
};

type ActionsType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof removePostAC>
  | ReturnType<typeof setPostsAC>;
type PostsStateType = {
  posts: Array<PostType>;
};
