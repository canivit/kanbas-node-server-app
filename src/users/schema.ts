import mongoose from "mongoose";

export type User = {
  username: string;
  password: string;
  firstName?: string;
  email?: string;
  lastName?: string;
  dob?: Date;
  role?: "STUDENT" | "FACULTY" | "ADMIN" | "USER";
};

export const userSchema = new mongoose.Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
      default: "USER",
    },
  },
  { collection: "users" }
);
