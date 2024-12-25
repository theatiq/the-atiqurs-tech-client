import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

import About from "../pages/About";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TopBrands from "../components/TopBrands";

import PrivateRoute from "./PrivateRoute";
import Letter from "../pages/Letter";
import Fest from "../pages/Fest";
import Forget from "../pages/Forget";
import UpdateProfile from "../pages/UpdateProfile";
import AddBlog from "../pages/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import BlogDetails from "../pages/BlogDetails";
import MyBlogs from "../pages/MyBlogs";
import UpdateBlog from "../pages/UpdateBlog";
import MyWishList from "../pages/MyWishList";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import WishlistDetails from "../pages/wishlistDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch("https://assignment-11-atiqur-server.vercel.app/blogsHome"),
      },
      {
        path: "/addBlog",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/allBlogs",
        element: <AllBlogs></AllBlogs>,
        loader: () =>
          fetch("https://assignment-11-atiqur-server.vercel.app/blogs"),
      },
      {
        path: "/featuredBlogs",
        element: <FeaturedBlogs></FeaturedBlogs>,
        loader: () =>
          fetch("https://assignment-11-atiqur-server.vercel.app/blogsFeatured"),
      },

      {
        path: "/myBlogs",
        element: <MyBlogs></MyBlogs>,
      },
      {
        path: "/updateBlog/:id",
        loader: ({ params }) =>
          fetch(
            `https://assignment-11-atiqur-server.vercel.app/blogs/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <UpdateBlog></UpdateBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/myWishList",
        element: (
          <PrivateRoute>
            <MyWishList></MyWishList>
          </PrivateRoute>
        ),
      },

      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/letter",
        element: <Letter></Letter>,
      },
      {
        path: "/fest",
        element: <Fest></Fest>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/forget",
        element: <Forget></Forget>,
      },
      {
        path: "/auth/update",
        element: <UpdateProfile></UpdateProfile>,
      },
    ],
  },
  {
    path: "/blogs/:id",
    element: (
      <PrivateRoute>
        <BlogDetails></BlogDetails>
      </PrivateRoute>
    ),
    loader: ({ params }) =>
      fetch(
        `https://assignment-11-atiqur-server.vercel.app/blogs/${params.id}`
      ),
  },
  {
    path: "/wishlistDetails/:id",
    element: <WishlistDetails></WishlistDetails>,
    loader: ({ params }) =>
      fetch(
        `https://assignment-11-atiqur-server.vercel.app/wishList/${params.id}`
      ),
  },

  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
  ,
]);

export default router;
