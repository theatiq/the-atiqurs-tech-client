import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { MdDelete } from "react-icons/md";

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const [myWishList, setMyWishList] = useState([]);
  const email = user.email;

  useEffect(() => {
    fetch(`http://localhost:5000/myWishList?email=${email}`)
      .then((res) => res.json())
      .then((data) => setMyWishList(data));
  }, [email]);

  const handleDeleteWatchList = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/wishList/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "The item has been removed.", "success");
              const remainingWatchList = myWishList.filter(
                (watch) => watch._id !== _id
              );
              setMyWishList(remainingWatchList);
            }
          });
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold text-center mb-5">
        My Watch List ({myWishList.length})
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
            {myWishList.map((wish, index) => (
              <tr key={wish._id} className="text-center hover:bg-gray-100">
                <td className="p-3 border border-gray-300">{index + 1}</td>
                <td className="p-3 border border-gray-300">
                  <img
                    src={wish.image}
                    alt={wish.title}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                </td>
                <td className="p-3 border border-gray-300">{wish.title}</td>
                <td className="p-3 border border-gray-300">
                  {wish.shortDescription}
                </td>
                <td className="p-3 border border-gray-300">{wish.category}</td>
                <td className="p-3 border border-gray-300">
                  {wish.postedDate}
                </td>
                <td className="p-3 border border-gray-300">
                  <button
                    onClick={() => handleDeleteWatchList(wish._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 flex items-center px-2 py-1 rounded"
                    title="Delete from Watch List"
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

export default MyWishList;
