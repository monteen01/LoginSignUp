import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
const app = express();
import userModel from "./models/user.js";
import dotenv from "dotenv";
dotenv.config();
// setting the middelware
app.use(express.json());

// app.use(cors());
app.use(
  cors({
    origin: ["https://react-loginform.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// mongoose connecion URI
const mongoURI = process.env.MONGODB_URI;

connect(mongoURI);
//home route
app.post("/login", function (req, res) {
  // Getting the email and password from the frontend client
  const { email, password } = req.body;

  userModel.findOne({ email: email, password: password }).then((user) => {
    if (user) {
      if (user.password === password) {
        // Responding with success and user data
        res.json({ status: "success", user, email: user.email });
      } else {
        // Incorrect password
        res.json({ status: "Incorrect password" });
      }
    } else {
      // No account found
      res.json({ status: "No account found.." });
    }
  });
});

// routing to register
app.post("/register", (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.post("/update-profile", async (req, res) => {
  try {
    const { email, gender, dateOfBirth, mobileNumber, age } = req.body;

    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      { $set: { gender, dateOfBirth, mobileNumber, age } },
      { new: true }
    );

    if (updatedUser) {
      res.json({ status: "success", user: updatedUser });
    } else {
      res.json({ status: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.json({ status: "Error updating profile" });
  }
});
// port
const PORT = process.env.BASE_URL;
app.listen(PORT, () => {
  console.log("SERVER is running");
});
