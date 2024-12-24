import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import { MdDelete, MdOutlineSecurityUpdateGood } from "react-icons/md";

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const [myBlogs, setMyBlogs] = useState([]);
  const email = user?.email;

  useEffect(() => {
    fetch(`http://localhost:5000/myReviews?email=${email}`)
      .then((res) => res.json())
      .then((data) => setMyBlogs(data));
  }, [email]);

  const handleDeleteBlog = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/blog/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your blog has been deleted.", "success");
              const remainingBlogs = myBlogs.filter(
                (review) => review._id !== _id
              );
              setMyBlogs(remainingBlogs);
            }
          });
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold text-center mb-5">
        My Blogs ({myBlogs.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border border-gray-300">#</th>
              <th className="p-3 border border-gray-300">Thumbnail</th>
              <th className="p-3 border border-gray-300">Title</th>
              <th className="p-3 border border-gray-300">Rating</th>
              <th className="p-3 border border-gray-300">Year</th>
              <th className="p-3 border border-gray-300">Category</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {myBlogs.map((blog, index) => (
              <tr key={blog._id} className="text-center hover:bg-gray-100">
                <td className="p-3 border border-gray-300">{index + 1}</td>
                <td className="p-3 border border-gray-300">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                </td>
                <td className="p-3 border border-gray-300">{blog.title}</td>
                <td className="p-3 border border-gray-300">{blog.rating}</td>
                <td className="p-3 border border-gray-300">{blog.year}</td>
                <td className="p-3 border border-gray-300">{blog.genres}</td>
                <td className="p-3 border border-gray-300 flex justify-center space-x-2">
                  <NavLink to={`/updateBlog/${blog._id}`}>
                    <button
                      className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center px-2 py-1 rounded"
                      title="Update Review"
                    >
                      <MdOutlineSecurityUpdateGood size={18} />
                    </button>
                  </NavLink>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 flex items-center px-2 py-1 rounded"
                    title="Delete Review"
                  >
                    <MdDelete size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBlogs;
