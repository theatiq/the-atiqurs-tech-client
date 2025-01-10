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

  // Sample Tech Tips and Ads data
  const techTips = [
    {
      title: "Optimize Website Performance",
      content:
        "Minimize the use of large images and enable Gzip compression to improve site speed.",
    },
    {
      title: "Version Control Shortcut",
      content:
        "Use `git stash` to save uncommitted changes temporarily and switch branches easily.",
    },
    {
      title: "Debugging API Calls",
      content:
        "Use Postman or Insomnia to test API endpoints before integrating them into your app.",
    },
    {
      title: "Enhance Code Readability",
      content:
        "Follow consistent naming conventions and use descriptive variable names.",
    },
    {
      title: "Keyboard Shortcut for Productivity",
      content:
        "In VS Code, press `Ctrl + D` to select the next occurrence of a word and edit multiple instances.",
    },
    {
      title: "Secure Your Applications",
      content:
        "Always use environment variables to store API keys and secrets, and avoid committing them to Git.",
    },
    {
      title: "Cross-Browser Testing",
      content:
        "Use tools like BrowserStack or LambdaTest to ensure your app works on multiple browsers and devices.",
    },
    {
      title: "CSS Performance Tip",
      content:
        "Place commonly used styles higher in your stylesheet for better rendering performance.",
    },
    {
      title: "Avoid Memory Leaks in JavaScript",
      content:
        "Clear unused intervals, listeners, and variables to prevent memory overflow.",
    },
    {
      title: "Responsive Design Tip",
      content:
        "Use relative units like `em`, `%`, and `rem` instead of fixed units like `px` for scalable designs.",
    },
    {
      title: "Database Optimization",
      content:
        "Use indexing on frequently queried fields to speed up database read operations.",
    },
    {
      title: "Email Testing",
      content:
        "Use services like Mailtrap to test email functionality without sending emails to real users.",
    },
    {
      title: "Code Documentation",
      content:
        "Use JSDoc or similar tools to generate documentation directly from your comments.",
    },
    {
      title: "Cross-Browser Testing",
      content:
        "Use tools like BrowserStack or LambdaTest to ensure your app works on multiple browsers and devices.",
    },
    {
      title: "RESTful API Design",
      content:
        "Keep your endpoints consistent and predictable by following REST conventions.",
    },
    {
      title: "Secure Passwords",
      content:
        "Implement bcrypt or a similar hashing algorithm to securely store passwords in your database.",
    },
  ];

  const ads = [
    {
      title: "Learn Complete Web Development",
      content:
        "Join our online coding bootcamp and transform your career in tech.",
      img: "https://i.ibb.co.com/YQLTNFQ/Programming-hero.jpg",
    },
    {
      title: "Buy the Best Tech Gadgets",
      content:
        "Discover the latest gadgets and exclusive discounts. Don't miss out!",
      img: "https://i.ibb.co.com/6nQrtJd/Gadget.png",
    },

    {
      title: "Learn Computer Science",
      content:
        "Udemy, Inc. is an education technology company, founded in May 2010 by Eren Bali, Gagan Biyani, and Oktay Caglar. It is based in San Francisco, California",
      img: "https://i.ibb.co.com/jVC578Z/udemy.jpg",
    },
    {
      title: "Learn Programming",
      content:
        "Learn Data Science & AI from the comfort of your browser, at your own pace with DataCamp's video tutorials & coding challenges on R, Python, Statistics & more.",
      img: "https://i.ibb.co.com/5hC42HF/data.webp",
    },
    {
      title: "Learn Everything",
      content:
        "Khan Academy is an American non-profit educational organization created in 2006 by Sal Khan. Its goal is to create a set of online tools that help educate students.",
      img: "https://i.ibb.co.com/rwvvRvB/khan.png",
    },
    {
      title: "Learn Programming",
      content:
        "edX is a US for-profit online education platform owned by 2U since 2021.",
      img: "https://i.ibb.co.com/LJJ7vhM/edx.png",
    },
    {
      title: "Learn skills by sharing",
      content:
        "Skillshare is an online learning community based in the United States that provides educational videos.",
      img: "https://i.ibb.co.com/hyW3T4W/skill.png",
    },
  ];

  return (
    <div
      className={`w-full mx-auto ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      {/* Dark Mode Toggle */}
      {/* <div className="flex justify-end mb-3">
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={50}
        />
        <p className="text-sm ml-3">
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </p>
      </div> */}

      {/* Typewriter */}
      {/* <div className="text-center mb-5">
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
      </div> */}

      <Banner />

      {/* Layout: Left Sidebar, Main Content, Right Sidebar */}
      <div className="flex flex-col lg:flex-row gap-5 mt-10">
        {/* Left Sidebar - Tech Tips */}
        <aside className="w-full lg:w-1/6">
          <h2 className="text-xl font-bold text-center mb-5 text-purple-800 dark:text-purple-400">
            Tech Tips
          </h2>
          <div className="grid gap-5">
            {techTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold text-purple-800 dark:text-purple-400">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-center font-bold text-3xl text-purple-800 my-5">
            Recent Blog Posts
          </h1>
          <div className="">
            {allBlogs.map((blog) => (
              <div key={blog._id}>
                <Blog reviews={blog} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Ads */}
        <aside className="w-full lg:w-1/6">
          <h2 className="text-xl font-bold text-center mb-5 text-purple-800 dark:text-purple-400">
            Sponsored Ads
          </h2>
          <div className="grid gap-5">
            {ads.map((ad, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
              >
                <img src={ad.img} alt={ad.title} className="rounded-md mb-3" />
                <h3 className="text-lg font-bold text-purple-800 dark:text-purple-400">
                  {ad.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {ad.content}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <div>
        {/* Subscription Section */}
        <section className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mt-10 p-5 text-center">
          <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-3">
            Subscribe to Atiqur's Tech Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-5">
            Get the latest tech news, articles, and exclusive content delivered
            to your inbox weekly.
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
    </div>
  );
};

export default Home;
