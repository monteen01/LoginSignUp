import { Schema, model } from "mongoose";
// creating schema
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  conformPassword: String,
  gender: String,
  dateOfBirth: Date,
  mobileNumber: String,
  age: Number,
});
const userModel = model("users", userSchema);
export default userModel;
