import React, { useContext } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "./Loading";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import toast from "react-hot-toast";

const BlogDetails = () => {
  const { user, setUser, logOut, createUserGoogle } = useContext(AuthContext);
  const blogs = useLoaderData();
  const { id } = useParams();
  const {
    _id,
    title,
    image,
    category,
    shortDescription,
    longDescription,
    postedDate,
    email,
    postedBy,
    postedByPhoto,
  } = blogs;
  const currenEmail = user.email;
  const currentUserName = user.displayName;
  const currentPhoto = user.photoURL;

  // const watchList = {
  //   _id,
  //   title,
  //   image,
  //   category,
  //   shortDescription,
  //   longDescription,
  //   postedDate,
  //   postedBy,
  //   postedByPhoto,
  //   currentUserName,
  //   currenEmail,
  // };

  // const handleAddWatchList = () => {
  //   fetch("http://localhost:5000/watchList", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(watchList),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.insertedId) {
  //         Swal.fire({
  //           title: "Success!",
  //           text: "Successfully added to Watch List",
  //           icon: "success",
  //           confirmButtonText: "Ok",
  //         });
  //       }
  //     });
  // };

  if (!blogs) return <Loading></Loading>;

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="w-11/12 mx-auto mt-10 my-10">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="lg:flex items-center mb-5">
            <img
              src={image}
              alt={image}
              className="w-64 h-64 mr-6 rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-blue-950">{title}</h1>
              <p className="text-gray-600">{title}</p>
              <p className="mt-2 text-lg font-medium">
                Category: <span className="text-blue-600">{category}</span>
              </p>
              <p className="mt-2 text-lg font-medium">
                Details:{" "}
                <span className="text-blue-600">{longDescription}</span>
              </p>
              <p className="mt-2 text-lg font-medium">
                Posted On: <span className="text-blue-600">{postedDate}</span>
              </p>
              <p className="text-gray-600">Posted Name: {postedBy}</p>
              <p className="text-gray-600">Posted Email: {email}</p>
              <img className="w-10 rounded-full" src={postedByPhoto} alt="" />
              <button className="btn">Post a Comment</button>
            </div>
            <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
              <form className="card-body">
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
                </div>
                <div>
                  <h1>Commented by</h1>
                  <p className="text-gray-600">
                    Posted Name: {currentUserName}
                  </p>
                  <p className="text-gray-600">Posted Email: {currenEmail}</p>
                  <img
                    className="w-10 rounded-full"
                    src={currentPhoto}
                    alt=""
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary">Post a Comment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default BlogDetails;
