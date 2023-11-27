import { Express, Request } from "express";
import * as dao from "./dao";

export function userRoutes(app: Express) {
  app.post(
    "/api/users/signin",
    async (req: Request<{}, {}, Credentials>, res) => {
      const { username, password } = req.body;
      const user = await dao.findUserByCredentials(username, password);
      if (!user) {
        res.status(401).send("Invalid credentials");
        return;
      }
      res.send(user);
    }
  );
}

type Credentials = {
  username: string;
  password: string;
};
