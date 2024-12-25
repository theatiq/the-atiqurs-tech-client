import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Blog = ({ reviews }) => {
  const { user } = useContext(AuthContext);
  const {
    _id,
    title,
    image,
    category,
    shortDescription,
    longDescription,
    postedDate,
    email,
  } = reviews;

  const wishList = {
    blogId: reviews?._id,
    title,
    image,
    category,
    shortDescription,
    longDescription,
    postedDate,
    email: user?.email,
    timestamp: new Date().toLocaleString(),
  };

  const handleAddWishList = () => {
    fetch("https://assignment-11-atiqur-server.vercel.app/wishList", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(wishList),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Successfully added to Watch List",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  if (!reviews) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 border rounded-lg shadow-md bg-white">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Left Section with Image */}
        <div>
          <img
            src={image}
            alt="Blog Post"
            className="w-full h-[300px] object-cover rounded-lg"
          />
        </div>

        {/* Right Section with Text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-indigo-700">{title}</h2>
          <p className="mt-2 text-gray-600">
            <span className="font-semibold">Category:</span> {category}
          </p>
          <p className="mt-2 text-gray-600">
            <span className="font-semibold">Publishing Date:</span> {postedDate}
          </p>
          <p className="mt-4 text-gray-800 leading-relaxed">
            {longDescription}
          </p>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="mt-5 flex justify-between items-center">
        <NavLink
          to={`/blogs/${_id}`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Explore Details
        </NavLink>
        <button
          onClick={handleAddWishList}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default Blog;
