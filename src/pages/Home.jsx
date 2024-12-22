import React, { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner";
import { useLoaderData } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import { Typewriter } from "react-simple-typewriter";

import Review from "./Review";
import Swal from "sweetalert2";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const allReviews = useLoaderData();

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
      <div className="place-items-end">
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={50}
        />
        <p className="text-sm">{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
      </div>
      <span
        style={{ color: "blueviolet" }}
        className="text-4xl font-semibold flex justify-center"
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
      <Banner />

      <h1 className="text-center font-bold text-3xl text-purple-800 my-5">
        Recent Blog Posts
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 p-5">
        {allReviews.map((review) => (
          <div key={review._id} className="">
            <Review reviews={review} />
          </div>
        ))}
      </div>

      <section className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mt-10 p-5 text-center">
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-3">
          Subscribe to Atiqur's Tech Newsletter
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-5">
          Get the latest tech news, articles, and exclusive content delivered to
          your inbox weekly.
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
  );
};

export default Home;
