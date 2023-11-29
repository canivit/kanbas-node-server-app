import express from "express";
import { hello } from "./hello";
import { lab5 } from "./lab5";
import cors from "cors";
import { courseRoutes } from "./courses/routes";
import { moduleRoutes } from "./modules/routes";
import { assignmentRoutes } from "./assignments/routes";
import mongoose from "mongoose";
import { userRoutes } from "./users/routes";
import session from "express-session";

mongoose.connect("mongodb://localhost:27017/kanbas");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());

userRoutes(app);
assignmentRoutes(app);
moduleRoutes(app);
courseRoutes(app);
lab5(app);
hello(app);

app.listen(process.env.PORT || 4000);
