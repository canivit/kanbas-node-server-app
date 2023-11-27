import { Express, Request } from "express";
import * as dao from "./dao";
import { User } from "./schema";

let currentUser: User | false = false;

export function userRoutes(app: Express) {
  app.post(
    "/api/users/signin",
    async (req: Request<{}, {}, Credentials>, res) => {
      const { username, password } = req.body;
      currentUser =
        (await dao.findUserByCredentials(username, password)) ?? false;
      if (!currentUser) {
        res.status(401).send("Invalid credentials");
        return;
      }
      res.send(currentUser);
    }
  );

  app.get("/api/users/account", async (_req, res) => {
    if (!currentUser) {
      res.status(401).send("Not signed in");
      return;
    }
    res.send(currentUser);
  });
}

type Credentials = {
  username: string;
  password: string;
};
