import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate("/login");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/register", {
        name,
        email,
        password,
        conformPassword,
      });
      console.log(result);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  const handlePasswordBlur = () => {
    if (password !== conformPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordBlur = () => {
    handlePasswordBlur();
  };
  const validateName = () => {
    if (!name.trim()) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
  return (
    <div className="grid place-items-center mt-10 ">
      <form
        onSubmit={handleSubmit}
        className="relative space-y-2 rounded-md bg-white p-6 shadow-xl border-gray-100 lg:p-10 border m-3"
      >
        <h1 className="text-xl font-semibold lg:text-2xl">Register</h1>
        <p className="pb-4 text-gray-500">Create a new account</p>

        <div>
          <label className=""> Username </label>
          <input
            type="text"
            placeholder="Username"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            onChange={(e) => setName(e.target.value)}
            onBlur={validateName}
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>
        <div className="">
          <label className=""> Email Address </label>
          <input
            type="email"
            placeholder="Info@example.com"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div>
          <label className=""> Password </label>
          <input
            type="password"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            onBlur={handlePasswordBlur}
          />
        </div>

        <div>
          <label className="">Confirm Password </label>
          <input
            type="password"
            placeholder="******"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            onChange={(e) => setConformPassword(e.target.value)}
            onBlur={handleConfirmPasswordBlur}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div>
          <button
            type="submit "
            className="mt-2 h-12 text-center  w-full rounded-md bg-blue-600 text-white "
          >
            Submit
          </button>
        </div>
      </form>
      <div className="text-center">
        <p className="text-gray-500">
          Already have an account?
          <span className="text-blue-500 ml-1">
            <Link to="/login">log in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
