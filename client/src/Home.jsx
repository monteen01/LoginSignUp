import { useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const notify = () => toast("Successfully Updated Profile");
  const location = useLocation();
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const { user } = location.state;

  const handleLogout = () => {
    navigate("/login");
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };
  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const age = calculateAge();

    try {
      const result = await axios.post("http://localhost:3001/update-profile", {
        email: location.state.email,
        gender,
        dateOfBirth,
        mobileNumber,
        age,
      });

      console.log(result);

      if (result.data.status === "success") {
        console.log("Profile updated successfully", result.data);
      } else {
        console.log("Error updating profile");
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Form submitted:", {
      gender,
      dateOfBirth,
      mobileNumber,
      age,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <Link
          to="/login"
          onClick={handleLogout}
          className="bg-blue-500 text-white py-1 px-3 mx-2 my-3 rounded-sm shadow-md"
        >
          Logout
        </Link>
      </div>
      <div className="max-w-sm mx-auto border-gray-400 shadow-xl px-4 py-4 rounded-md mt-10">
        <h1 className="text-2xl font-bold text-center">Profile</h1>
        <h1 className="text-lg text-center">
          Welcome,<span className="font-semibold"> {user.name}!🙏</span>
        </h1>
        <hr className="" />

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2 text-gray-700">
              Gender:
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                  className="mr-2"
                  required
                />
                Male
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Female
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Other
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block mb-2 text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => handleDateOfBirthChange(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
              required
            />
            {dateOfBirth && (
              <div className="mt-4">
                <p className="text-gray-700">Your age is: {calculateAge()}</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block mb-2 text-gray-700">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            onClick={notify}
            className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Home;
