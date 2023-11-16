import express from "express";
import { hello } from "./hello";
import { lab5 } from "./lab5";
import cors from "cors";
import { courseRoutes } from "./courses/routes";
import { moduleRoutes } from "./modules/routes";

const app = express();
app.use(cors());
app.use(express.json());
moduleRoutes(app);
courseRoutes(app);
lab5(app);
hello(app);
app.listen(4000);
