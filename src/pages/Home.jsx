import React, { useState } from "react";
import Banner from "../components/Banner";
import { useLoaderData } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import { Typewriter } from "react-simple-typewriter";
import Blog from "./Blog";
import Swal from "sweetalert2";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const allBlogs = useLoaderData();

  const handleSubscribe = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Success!",
      text: "Thank you for subscribing to our newsletter",
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  return (
    <div
      className={`w-11/12 mx-auto ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-3">
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={50}
        />
        <p className="text-sm ml-3">
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </p>
      </div>

      {/* Typewriter */}
      <div className="text-center mb-5">
        <span
          style={{ color: "blueviolet" }}
          className="text-4xl font-semibold"
        >
          <Typewriter
            words={["Get...", "Set...", "Go......"]}
            loop={10}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </div>

      <Banner />

      {/* Layout: Left Sidebar, Main Content, Right Sidebar */}
      <div className="flex flex-col lg:flex-row gap-5 mt-10">
        {/* Left Sidebar - Tech Tips */}
        <aside className="w-full lg:w-1/4">
          <h2 className="text-xl font-bold text-center mb-5 text-purple-800 dark:text-purple-400">
            Tech Tips
          </h2>
          <div className="grid gap-5">
            {/* Tip 1 */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-purple-800 dark:text-purple-400">
                Master Git Commands
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use `git log --oneline` to view a concise list of your commits.
              </p>
            </div>
            {/* Tip 2 */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-purple-800 dark:text-purple-400">
                CSS Tip: Centering Divs
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use `display: flex; justify-content: center; align-items:
                center;` for easy centering.
              </p>
            </div>
            {/* Tip 3 */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-purple-800 dark:text-purple-400">
                Debugging with Console
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use `console.table()` to print arrays or objects in an
                easy-to-read tabular format.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-center font-bold text-3xl text-purple-800 my-5">
            Recent Blog Posts
          </h1>
          <div className="grid gap-5 my-5 p-5">
            {allBlogs.map((blog) => (
              <div key={blog._id} className="">
                <Blog reviews={blog} />
              </div>
            ))}
          </div>

          {/* Subscription Section */}
          <section className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mt-10 p-5 text-center">
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-3">
              Subscribe to Atiqur's Tech Newsletter
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-5">
              Get the latest tech news, articles, and exclusive content
              delivered to your inbox weekly.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row justify-center gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-md w-full md:w-2/3 text-gray-800 dark:text-gray-200"
                required
              />
              <button
                type="submit"
                className="bg-purple-700 dark:bg-purple-500 text-white p-3 rounded-md hover:bg-purple-800 dark:hover:bg-purple-600"
              >
                Subscribe
              </button>
            </form>
          </section>
        </div>

        {/* Right Sidebar - Ads */}
        <aside className="w-full lg:w-1/4">
          <h2 className="text-xl font-bold text-center mb-5 text-purple-800 dark:text-purple-400">
            Sponsored Ads
          </h2>
          <div className="grid gap-5">
            {/* Ad 1 */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Ad 1"
                className="rounded-md mb-3"
              />
              <h3 className="text-lg font-bold text-purple-800 dark:text-purple-400">
                Buy the Best Tech Gadgets
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Discover the latest gadgets and exclusive discounts. Don't miss
                out!
              </p>
            </div>

            {/* Ad 2 */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Ad 2"
                className="rounded-md mb-3"
              />
              <h3 className="text-lg font-bold text-purple-800 dark:text-purple-400">
                Learn Programming
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Join our online coding bootcamp and transform your career in
                tech.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
