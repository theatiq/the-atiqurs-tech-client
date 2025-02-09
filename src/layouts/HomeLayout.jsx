import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Welcome from "../components/Welcome";
import DarkModeToggle from "react-dark-mode-toggle";

const HomeLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className={`font-poppins ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="sticky z-50 top-0 opacity-90">
        <Navbar></Navbar>
        {/* <div>
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={80}
          />
          <p>{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
        </div> */}
        {/* <Welcome></Welcome> */}
      </header>
      <main className="mb-5 min-h-screen">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
