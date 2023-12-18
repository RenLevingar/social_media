import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/css/style.css';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import AllPosts from './Pages/AllPosts'
import MyPosts from './Pages/MyPosts';
import Blog from './Pages/Blog'
import Error from './Pages/Error'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/allposts",
    element: <AllPosts />,
  },
  {
    path: "/myposts",
    element: <MyPosts />
  },
  {
    path: "/blog",
    element: <Blog />
  },
  {
    path: "*",
    element: <Error />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);