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
        posts: state.posts.filter((obj: PostType) => obj.id !== action.id),
      };
    case "SET-POSTS":
      return { posts: action.posts.map((p) => ({ ...p })) };
    default:
      return state;
  }
}

// Action Creators
export const removePostAC = (id: string) =>
  ({ type: "REMOVE_POST", id } as const);
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

export const fetchPostsTC = (): ThunkType => (dispatch) => {
  postsApi.getPosts().then((res) => {
    dispatch(setPostsAC(res.data));
  });
};

export const removePostTC =
  (id: string): ThunkType =>
  (dispatch) => {
    postsApi.removePost(id).then((res) => {
      dispatch(removePostAC(id));
    });
  };

type ActionsType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof removePostAC>
  | ReturnType<typeof setPostsAC>;
type PostsStateType = {
  posts: Array<PostType>;
};
