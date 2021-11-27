import React from "react";
import { Container } from "@mui/material";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { useDispatch } from "react-redux";
import { addPostTC } from "./redux/reducers/posts-reducer";
import { FullPost } from "./pages/FullPost";

function App() {
  const dispatch = useDispatch();
  const addPost = () => {
    dispatch(addPostTC());
  };

  return (
    <div className="App">
      <Header onAddPost={addPost} />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<FullPost />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
