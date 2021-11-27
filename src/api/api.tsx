import axios from "axios";
import { PostType } from "../types/types";

const instance = axios.create({
  baseURL: "https://617826619c328300175f5e53.mockapi.io/",
});

// api

export const postsApi = {
  getPosts() {
    return instance.get<Array<PostType>>("posts");
  },
  createPost() {
    return instance.post<PostType>("posts");
  },
  removePost(id: string) {
    return instance.delete(`posts/${id}`);
  },
};
