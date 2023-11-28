import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div className="container grid place-items-center mt-[10rem] ">
      <form className="w-[700px] text-center ">
        <h1 className="text-xl mb-2">Login or SignUp</h1>
        <div className="flex justify-evenly items-center">
          <button className="mt-2 h-12 text-center px-6 py-2 shadow-sm rounded-md bg-blue-600  text-white ">
            <Link to="/register">Register</Link>
          </button>
          <button className="mt-2 h-12 text-center px-6 py-2 shadow-lg rounded-md border text-blue-500 border-gray-200 ">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
