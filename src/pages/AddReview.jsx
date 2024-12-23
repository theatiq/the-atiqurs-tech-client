import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const AddReview = () => {
  const { user, setUser, logOut, createUserGoogle } = useContext(AuthContext);

  const handleAddBlog = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const review = e.target.review.value;
    const rating = e.target.rating.value;
    const year = e.target.year.value;
    const genres = e.target.genres.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const userName = e.target.userName.value;

    const newReview = {
      title,
      review,
      rating,
      year,
      genres,
      image,
      email,
      userName,
    };

    // send data to the server and database
    fetch("http://localhost:5000/addReview", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Review added successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          e.target.reset();
        }
      });
  };

  return (
    <div className="lg:w-3/4 mx-auto">
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold">Create a New Blog</h1>
        <p className="py-6">
          Here you have the horizon to create your creative blog posts.
        </p>
      </div>
      <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
        <form onSubmit={handleAddBlog} className="card-body">
          {/* form first row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
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
                className="select select-bordered"
                required
              >
                <option value="" disabled selected>
                  Select a Category
                </option>
                <option value="action">Tech News & Trends</option>
                <option value="rpg">Programming & Development</option>
                <option value="adventure">Gadgets & Reviews</option>
                <option value="strategy"> How-To Guides & Tutorials</option>
                <option value="sports">Future of Tech</option>
              </select>
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Short Description</span>
              </label>
              <input
                type="text"
                name="shortDescription"
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
                placeholder="Enter your long description here..."
                className="textarea textarea-bordered h-40"
                required
              ></textarea>
            </div>
            {/* <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Publishing Year</span>
              </label>
              <select name="year" className="select select-bordered" required>
                <option value="" disabled selected>
                  Select a year
                </option>
                {Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div> */}
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
            <button className="btn btn-primary">Create A Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
