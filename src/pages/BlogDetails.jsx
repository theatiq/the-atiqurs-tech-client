import React, { useContext } from "react";
import { NavLink, useLoaderData, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "./Loading";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
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

  const currentEmail = user?.email;
  const currentUserName = user?.displayName;
  const currentPhoto = user?.photoURL;

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const commentData = {
      blogId: blogs?._id,
      comment,
      currentUserName,
      currentPhoto,
      currentEmail,
      timestamp: new Date(),
    };

    fetch("http://localhost:5000/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Thanks for your valuable comment",
            icon: "success",
            confirmButtonText: "Ok",
          });
          e.target.reset();
        }
      });
  };

  if (!blogs) return <Loading />;

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="w-11/12 mx-auto mt-10 my-10">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <div className="lg:flex items-center mb-6">
            <img
              src={image}
              alt={title}
              className="w-64 h-64 mr-6 rounded-lg shadow-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-blue-900 mb-2">{title}</h1>
              <p className="text-gray-600 mb-4">{shortDescription}</p>
              <p className="text-lg font-medium text-blue-600 mb-2">
                Category: {category}
              </p>
              <p className="text-lg font-medium text-blue-600 mb-4">
                Posted On: {postedDate}
              </p>
              <div className="flex items-center mb-4">
                <img
                  src={postedByPhoto}
                  alt={postedBy}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-gray-600 font-semibold">{postedBy}</p>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-800">{longDescription}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Post a Comment</h2>
            {currentEmail !== email ? (
              <form onSubmit={handleComment}>
                <textarea
                  name="comment"
                  placeholder="Enter your comment here..."
                  className="textarea textarea-bordered w-full h-32 mb-4"
                  required
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img
                      src={currentPhoto}
                      alt={currentUserName}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-gray-600">{currentUserName}</p>
                  </div>
                  <button className="btn btn-primary px-6 py-2 text-white rounded-md hover:bg-blue-600">
                    Post Comment
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-red-500">
                You cannot comment on your own post.
              </p>
            )}
          </div>

          <div className="mt-8">
            {currentEmail === email && (
              <NavLink to={`/updateBlog/${_id}`}>
                <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 mt-4">
                  Update Blog
                </button>
              </NavLink>
            )}
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
