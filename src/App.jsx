import { Navigate, NavLink, Route, Routes } from "react-router";
import MainLayout from "./layout/Main";
import React from "react";
const PostsPage = React.lazy(() => import("./pages/Posts"));
const ProductsPage = React.lazy(() => import("./pages/Products"));
const UsersPage = React.lazy(() => import("./pages/Users"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<MainLayout />}>
        <Route path="products" element={<ProductsPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
