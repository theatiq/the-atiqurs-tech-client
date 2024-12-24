import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import imageIcon from "../assets/Logo.jfif";
import userImg from "../assets/user.png";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, setUser, logOut, createUserGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    createUserGoogle().then((result) => {
      const user = result.user;
      setUser(user);
      navigate("/");
    });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"} className="hover:text-teal-400">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/allBlogs"} className="hover:text-teal-400">
          All Blogs
        </NavLink>
      </li>
      <li>
        <NavLink to={"/myBlogs"} className="hover:text-teal-400">
          My Blogs
        </NavLink>
      </li>
      <li>
        <NavLink to={"/featuredBlogs"} className="hover:text-teal-400">
          Featured Blogs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/addBlog"} className="hover:text-teal-400">
              Add Blog
            </NavLink>
          </li>

          <li>
            <NavLink to={"/myWishList"} className="hover:text-teal-400">
              Wishlist
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      <div className="navbar text-white max-w-7xl mx-auto px-4 py-2">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-gray-800 p-2 shadow-lg"
            >
              {links}
            </ul>
          </div>
          <Link
            to={"/"}
            className="flex items-center gap-2 text-lg font-semibold text-teal-400"
          >
            <img className="w-8 rounded-full" src={imageIcon} alt="Logo" />
            Atiqur's Tech
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-4">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-4">
              {user?.email ? (
                <div>
                  <img
                    className="w-8 h-8 rounded-full border-2 border-teal-400"
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-content={user?.displayName || "User"}
                    alt="User Avatar"
                  />
                  <Tooltip id="user-tooltip" />
                </div>
              ) : (
                <img
                  className="w-8 h-8 rounded-full border-2 border-gray-500"
                  src={userImg}
                  alt="Default Avatar"
                />
              )}
              <button
                onClick={logOut}
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoogleLogin}
                className="btn btn-sm flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
              >
                <FcGoogle />
                Sign In
              </button>
              <NavLink
                to={"/auth/login"}
                className="btn btn-sm bg-teal-500 hover:bg-teal-600 text-white"
              >
                Login
              </NavLink>
              <NavLink
                to={"/auth/register"}
                className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
