import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [result] = useState(null); // Initialize result state

  const notify = () => {
    setIsLoggedIn(true);
    toast("Successfully logged in");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log(result);
      if (result.data.status === "success") {
        const { user, email } = result.data;
        setIsLoggedIn(true);
        console.log(result.data.user.name);
        // Call the notify function after successful login
        // notify();

        // Navigate to the home route after the toast message is displayed
        setTimeout(() => {
          navigate("/home", { state: { user, email } });
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-56">
      <form onSubmit={handleSubmit}>
        <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-3xl font-bold text-gray-700">Login</h1>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="email"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transhtmlForm cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Email
              </label>
            </div>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="password"
                id="password"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label
                htmlFor="password"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transhtmlForm cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Enter Your Password
              </label>
            </div>
          </div>

          <button
            type="submit"
            onClick={notify}
            className="rounded-lg bg-blue-600 py-3 font-bold text-white"
          >
            Login
          </button>
          <ToastContainer />
        </div>
      </form>
      <div className="text-center mt-3">
        <p className="text-gray-500">
          Already have an account?
          <span className="text-blue-500 ml-1">
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
