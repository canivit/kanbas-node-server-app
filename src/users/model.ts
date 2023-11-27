import mongoose from "mongoose";
import { User, userSchema } from "./schema";

export const userModel = mongoose.model<User>("users", userSchema);