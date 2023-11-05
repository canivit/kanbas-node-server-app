import express from "express";
import { hello } from "./hello";

const app = express();
hello(app);
app.listen(4000);
