import React, { useCallback, useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeLowVision } from "react-icons/fa6";
import toast from "react-hot-toast";
import { EmailContext } from "../providers/EmailProvider";
import Swal from "sweetalert2";
import loginImg from "../assets/login.jpg"

const Login = () => {
  const [email, setEmail] = useContext(EmailContext);
  const [success, setSuccess] = useState(false);
  const [logInError, setLogInError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    setEmail(email);
    const password = form.password.value;
    setSuccess(false);
    setLogInError("");

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        e.target.reset();
        setSuccess(true);
        Swal.fire({
          title: "Login",
          text: "Successful",
          icon: "success",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setLogInError(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username or Password Mismatch",
          footer:
            '<a href="#">Put username and password correctly and try again</a>',
        });
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 lg:px-10">
      {/* Left Side: Image */}
      <div className="flex lg:block w-full lg:w-1/2">
        <img
          src={loginImg} // Replace with your image URL
          alt="Login Illustration"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Right Side: Form */}
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-center mb-5">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
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
          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-none">Login</button>
          </div>
        </form>
        {success && (
          <p className="text-green-500 text-center">
            User Logged in Successfully
          </p>
        )}
        {logInError && <p className="text-red-600 text-center">{logInError}</p>}
        <p className="text-center font-semibold mt-4">
          Don't have an account?{" "}
          <Link className="text-red-500" to="/auth/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
