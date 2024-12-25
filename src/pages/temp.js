import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";

const FeaturedBlogs = () => {
  const allBlogs = useLoaderData();
  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold text-center mb-5">
        Featured Blogs ({allBlogs.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border border-gray-300">#</th>
              <th className="p-3 border border-gray-300">Thumbnail</th>
              <th className="p-3 border border-gray-300">Title</th>
              <th className="p-3 border border-gray-300">Description</th>
              <th className="p-3 border border-gray-300">Posted On</th>
              <th className="p-3 border border-gray-300">Category</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {allBlogs.map((blog, index) => (
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
                <td className="p-3 border border-gray-300">
                  {blog.longDescription}
                </td>
                <td className="p-3 border border-gray-300">
                  {blog.postedDate}
                </td>
                <td className="p-3 border border-gray-300">{blog.category}</td>
                <td className="p-3 border border-gray-300 flex justify-center space-x-2">
                  <NavLink to={`/updateBlog/${blog._id}`}>
                    <button
                      className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center px-2 py-1 rounded"
                      title="Update Review"
                    >
                      {/* <MdOutlineSecurityUpdateGood size={18} /> */}
                    </button>
                  </NavLink>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 flex items-center px-2 py-1 rounded"
                    title="Delete Review"
                  >
                    {/* <MdDelete size={18} /> */}
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

// export default FeaturedBlogs;
import React from "react";
import { motion } from "framer-motion";
import img2 from "../assets/01.jfif";
import img4 from "../assets/03.jfif";
import img5 from "../assets/05.jfif";
import img6 from "../assets/06.jfif";

const Slider = () => {
  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="carousel w-full h-[400px] relative overflow-hidden">
      {/* Slide 1 */}
      <motion.div
        id="slide1"
        className="carousel-item relative w-full"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={slideVariants}
        transition={{ duration: 1 }}
      >
        <img src={img2} className="w-full" alt="Slide 1" />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-5"
          variants={textVariants}
        >
          <h2 className="text-2xl font-bold mb-2">
            Gaming Contest Announcement
          </h2>
          <p className="text-sm">
            Join our upcoming Global Gaming Contest 2024 on March 15th! Register
            now and win exciting prizes.
          </p>
        </motion.div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </motion.div>

      {/* Slide 2 */}
      <motion.div
        id="slide2"
        className="carousel-item relative w-full"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={slideVariants}
        transition={{ duration: 1 }}
      >
        <img src={img4} className="w-full" alt="Slide 2" />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-5"
          variants={textVariants}
        >
          <h2 className="text-2xl font-bold mb-2">New Game Launch</h2>
          <p className="text-sm">
            Check out *Cyberverse 2.0*, the latest open-world adventure with
            stunning graphics and gameplay.
          </p>
        </motion.div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </motion.div>

      {/* Slide 3 */}
      <motion.div
        id="slide3"
        className="carousel-item relative w-full"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={slideVariants}
        transition={{ duration: 1 }}
      >
        <img src={img5} className="w-full" alt="Slide 3" />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-5"
          variants={textVariants}
        >
          <h2 className="text-2xl font-bold mb-2">E-Sports Championship</h2>
          <p className="text-sm">
            Witness the excitement of the Global E-Sports Championship 2024 with
            over 50 million live viewers.
          </p>
        </motion.div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </motion.div>

      {/* Slide 4 */}
      <motion.div
        id="slide4"
        className="carousel-item relative w-full"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={slideVariants}
        transition={{ duration: 1 }}
      >
        <img src={img6} className="w-full" alt="Slide 4" />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-5"
          variants={textVariants}
        >
          <h2 className="text-2xl font-bold mb-2">Upcoming Updates</h2>
          <p className="text-sm">
            Get ready for major updates in *Battle Kings* Season 5, featuring
            new weapons and ranked modes.
          </p>
        </motion.div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </motion.div>
    </div>
  );
};

// export default Slider;

useEffect(() => {
  const fetchWishList = async () => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token
      const res = await fetch(`https://assignment-11-atiqur-server.vercel.app/myWishList?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
        credentials: "include",
      });

      if (res.status === 401) {
        // Handle unauthorized (invalid or expired token)
        Swal.fire({
          title: "Session Expired",
          text: "Please log in again to access your wishlist.",
          icon: "warning",
          confirmButtonText: "Log In",
        }).then(() => {
          logOut(); // Log out the user if applicable
        });
        return;
      }

      const data = await res.json();
      setMyWishList(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  fetchWishList();
}, [email, logOut]);

useEffect(() => {
  const fetchWishList = async () => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token
      const res = await fetch(`https://assignment-11-atiqur-server.vercel.app/myWishList?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
        credentials: "include",
      });

      if (res.status === 401) {
        // Handle unauthorized (invalid or expired token)
        Swal.fire({
          title: "Session Expired",
          text: "Please log in again to access your wishlist.",
          icon: "warning",
          confirmButtonText: "Log In",
        }).then(() => {
          logOut(); // Log out the user if applicable
        });
        return;
      }

      const data = await res.json();
      setMyWishList(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  fetchWishList();
}, [email, logOut]);

