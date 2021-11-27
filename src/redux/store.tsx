import { applyMiddleware, combineReducers, createStore } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { postsReducer } from "./reducers/posts-reducer";
import { commentsReducer } from "./reducers/comments-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

// @ts-ignore
window.store = store;
