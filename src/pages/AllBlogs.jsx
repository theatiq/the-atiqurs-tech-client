import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Blog from "./Blog";
import { FcSearch } from "react-icons/fc";
// import { parseISO, compareDesc } from "date-fns";
import { parse } from "date-fns";

const AllBlogs = () => {
  const allBlogs = useLoaderData();
  const [filteredBlogs, setFilteredBlogs] = useState(allBlogs);
  const [genreFilter, setGenreFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    // Combine Search and Filter
    let filtered = allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (genreFilter && genreFilter !== "all") {
      filtered = filtered.filter((blog) =>
        blog.category.toLowerCase().includes(genreFilter.toLowerCase())
      );
    }

    // Apply Sorting
    if (sortOrder === "latest") {
      filtered.sort(
        (a, b) =>
          parse(b.postedDate, "MM/dd/yyyy, h:mm:ss a", new Date()) -
          parse(a.postedDate, "MM/dd/yyyy, h:mm:ss a", new Date())
      );
    } else if (sortOrder === "oldest") {
      filtered.sort(
        (a, b) =>
          parse(a.postedDate, "MM/dd/yyyy, h:mm:ss a", new Date()) -
          parse(b.postedDate, "MM/dd/yyyy, h:mm:ss a", new Date())
      );
    }

    // allBlogs
    //     .sort(
    //       (a, b) =>
    //         parse(b.postedDate, "MM/dd/yyyy, h:mm:ss a", new Date()) -
    //         parse(a.postedDate, "MM/dd/yyyy, h:mm:ss a", new Date())
    //     )

    setFilteredBlogs(filtered);
  }, [searchQuery, genreFilter, sortOrder, allBlogs]);

  const handleFilter = (genre) => {
    setGenreFilter(genre);
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-center text-4xl font-extrabold text-blue-900 mb-10">
        Explore Our Blogs
      </h1>

      {/* Search, Sort, and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 shadow-md rounded-lg mb-8 space-y-4 md:space-y-0 gap-5">
        {/* Search Bar */}
        <div className="w-full md:w-1/3 relative">
        <label htmlFor="sort" className="font-semibold text-gray-700 mr-2">
            Search by Title:
          </label>
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FcSearch className="absolute top-9 right-3 text-2xl" />
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-1/3">
          <label htmlFor="sort" className="font-semibold text-gray-700 mr-2">
            Sort by Date:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Filter Dropdown */}
        <div className="w-full md:w-1/3">
          <label htmlFor="filter" className="font-semibold text-gray-700 mr-2">
            Filter by Genre:
          </label>
          <select
            id="filter"
            value={genreFilter}
            onChange={(e) => handleFilter(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="Tech News & Trends">Tech News & Trends</option>
            <option value="Programming & Development">
              Programming & Development
            </option>
            <option value="Gadgets & Reviews">Gadgets & Reviews</option>
            <option value="How-To Guides & Tutorials">
              How-To Guides & Tutorials
            </option>
            <option value="Future of Tech">Future of Tech</option>
          </select>
        </div>
      </div>

      {/* Blog List */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow duration-200"
          >
            <Blog reviews={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
