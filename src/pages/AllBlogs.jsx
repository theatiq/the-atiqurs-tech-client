import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Blog from "./Blog";
import { FcSearch } from "react-icons/fc";

const AllBlogs = () => {
  const allBlogs = useLoaderData();
  const [filteredBlogs, setFilteredBlogs] = useState(allBlogs);
  // const [sortOption, setSortOption] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filterBlogs = allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filterBlogs);
  }, [searchQuery, allBlogs]);

  // Filter Functionality
  const handleFilter = (genre) => {
    setGenreFilter(genre);
    if (genre === "all") {
      setFilteredBlogs(allBlogs); // Reset to all reviews
    } else {
      const filtered = allBlogs.filter((blog) =>
        blog.category.toLowerCase().includes(genre.toLowerCase())
      );
      return setFilteredBlogs(filtered);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-bold text-blue-950 mb-5">
        All Blog Posts
      </h1>

      {/* Dropdown Menus */}
      <div className="lg:flex justify-between items-center mb-5 space-y-5">
        {/* Sorting Dropdown */}
        <div className="flex justify-center my-5">
          <input
            type="text"
            placeholder="Search by title..."
            className="p-2 border rounded-lg w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FcSearch className="-translate-x-10 translate-y-2 text-2xl"/>
        </div>

        {/* Filter Dropdown */}
        <div className="">
          <label htmlFor="filter" className="font-semibold mr-2">
            Filter by Genre:
          </label>
          <select
            id="filter"
            value={genreFilter}
            onChange={(e) => handleFilter(e.target.value)}
            className="border p-2 rounded w-[170px]"
          >
            <option value="all">All</option>
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
      </div>

      {/* Reviews Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBlogs.map((blog) => (
          <Blog key={blog._id} reviews={blog}></Blog>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
