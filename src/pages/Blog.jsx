import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
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
    timestamp: new Date().toLocaleString,
  };

  const handleAddWishList = () => {
    fetch("http://localhost:5000/wishList", {
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

  if (!reviews) return <Loading></Loading>;

  return (
    <div className="card bg-base-100 border-1 review-card">
      <figure className="px-5 pt-5">
        <img
          src={image}
          alt="image"
          className="rounded-lg h-[200px] w-full object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>Category: {category}</p>
        {/* <p>Rating: {rating}</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <AiFillStar
              key={i}
              className={`text-yellow-500 ${
                i < Math.round(rating) ? "" : "opacity-50"
              }`}
            />
          ))}
        </div> */}
        <p>Publishing Year: {postedDate}</p>
        <p>Short Description: {shortDescription}</p>
      </div>

      <NavLink to={`/blogs/${_id}`} className="btn mb-5 mx-5">
        Explore Details
      </NavLink>
      <button onClick={handleAddWishList} className="btn">
        Add to Wishlist
      </button>
    </div>
  );
};

export default Blog;
