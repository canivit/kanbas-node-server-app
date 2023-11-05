import express from "express";
import { hello } from "./hello";
import { lab5 } from "./lab5";

const app = express();
app.use(express.json());
lab5(app);
hello(app);
app.listen(4000);
