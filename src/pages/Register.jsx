import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeLowVision } from "react-icons/fa6";
import Swal from "sweetalert2";
import registerImg from "../assets/register.jpg";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");
    const conPassword = form.get("conPassword");

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long");
      return;
    }
    if (password !== conPassword) {
      setErrorMessage("Confirmed password does not match");
      return;
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regex.test(password)) {
      setErrorMessage(
        "Password must have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      );
      return;
    }
    setErrorMessage("");
    setSuccess(false);
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setSuccess(true);
        e.target.reset();
        Swal.fire({
          title: "Registration",
          text: "Successful",
          icon: "success",
        });
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => navigate("/"))
          .catch((err) => {});
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 lg:px-10">
      {/* Left Side: Image */}
      <div className="lg:w-1/2 h-48 lg:h-auto">
        <img
          className="w-full h-full object-cover"
          src={registerImg}
          alt="Register"
        />
      </div>

      {/* Right Side: Form */}
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-center mb-5">
          Register Your Account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>

          {/* Main Password */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-xs absolute right-4 top-12"
            >
              {showPassword ? <FaEyeLowVision /> : <IoEyeSharp />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="conPassword"
              placeholder="Confirm Password"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-none">Register</button>
          </div>
        </form>

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        {success && (
          <p className="text-green-500 text-center">Registration successful</p>
        )}
        <p className="text-center font-semibold mt-4">
          Already have an account?{" "}
          <Link className="text-red-500" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
