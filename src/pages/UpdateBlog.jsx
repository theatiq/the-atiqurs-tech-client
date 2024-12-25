import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { useLoaderData } from "react-router-dom";

const UpdateBlog = () => {
  const { user, setUser, logOut, createUserGoogle } = useContext(AuthContext);
  const blogs = useLoaderData();
  const {
    _id,
    title,
    image,
    category,
    shortDescription,
    longDescription,
    postedDate,
    email,
  } = blogs;
  const handleUpdateBlog = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const image = e.target.image.value;
    const category = e.target.category.value;
    const shortDescription = e.target.shortDescription.value;
    const longDescription = e.target.longDescription.value;
    const postedDate = e.target.postedDate.value;
    const email = e.target.email.value;

    const updatedBlog = {
      title,
      image,
      category,
      shortDescription,
      longDescription,
      postedDate,
      email,
    };

    // send data to the server and database
    fetch(`https://assignment-11-atiqur-server.vercel.app/update/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(updatedBlog),
      withCredentials: true,
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            // Invalid token
            Swal.fire({
              title: "Unauthorized!",
              text: "Your session has expired or the token is invalid. Please log in again.",
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {
              logOut(); // Log out the user if applicable
            });
          } else {
            // Other errors
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while updating the blog.",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Success!",
            text: "Blog added successfully.",
            icon: "success",
            confirmButtonText: "Ok",
          });
          e.target.reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="lg:w-3/4 mx-auto">
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold">Update Your Blog</h1>
        <p className="py-6">You can update your blogs here.</p>
      </div>
      <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
        <form onSubmit={handleUpdateBlog} className="card-body">
          {/* form first row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                defaultValue={title}
                placeholder="title of the blog"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Blog Image</span>
              </label>
              <input
                type="text"
                name="image"
                defaultValue={image}
                placeholder="Blog Image"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          {/* form second row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                name="category"
                defaultValue={category}
                className="select select-bordered"
                required
              >
                <option value="" disabled selected>
                  Select a Category
                </option>
                <option value="Tech News & Trends">Tech News & Trends</option>
                <option value="Programming & Development">
                  Programming & Development
                </option>
                <option value="Gadgets & Reviews">Gadgets & Reviews</option>
                <option value="How-To Guides & Tutorials">
                  {" "}
                  How-To Guides & Tutorials
                </option>
                <option value="Future of Tech">Future of Tech</option>
              </select>
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Short Description</span>
              </label>
              <input
                type="text"
                name="shortDescription"
                defaultValue={shortDescription}
                placeholder="Enter your short description here..."
                className="input input-bordered"
                required
              />
            </div>
          </div>
          {/* form third row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Long Description</span>
              </label>
              <textarea
                name="longDescription"
                defaultValue={longDescription}
                placeholder="Enter your long description here..."
                className="textarea textarea-bordered h-40"
                required
              ></textarea>
            </div>
          </div>

          {/* form fourth row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Posted Date</span>
              </label>
              <input
                type="text"
                name="postedDate"
                defaultValue={postedDate}
                value={new Date().toLocaleString()}
                placeholder="Posted Date"
                className="input input-bordered"
                disabled
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">User's Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={user?.email}
                placeholder="user's email"
                className="input input-bordered"
                disabled
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Update Your Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateBlog;
