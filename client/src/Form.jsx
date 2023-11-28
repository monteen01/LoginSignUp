import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div className="container grid place-items-center mt-[10rem] ">
      <form className="w-[300px] text-center border border-blue-500 rounded-md shadow-sm py-5  ">
        <h1 className="text-xl mb-2">Login or SignUp</h1>
        <div className="flex justify-evenly items-center">
          <Link
            className="mt-2  text-center px-6 py-2 shadow-lg rounded-md bg-blue-600 text-white"
            to="/register"
          >
            Register
          </Link>
          <Link
            className="mt-2  text-center px-6 py-2 shadow-lg rounded-md border text-blue-500 border-gray-200 "
            to="/login"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
