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

  app.get("/api/users", async (_req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  });

  app.post(
    "/api/users/:userId",
    async (req: Request<{ userId: string }, {}, User>, res) => {
      const { userId } = req.params;
      const user = await dao.findUserById(userId);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      const update = await dao.updateUser(userId, req.body);
      const updatedUser = await dao.findUserById(userId);
      currentUser = updatedUser ? updatedUser : currentUser;
      res.json(update);
    }
  );

  app.put("/api/users", async (req: Request<{}, {}, User>, res) => {
    try {
      const payload: any = { ...req.body };
      delete payload._id;
      const user = await dao.createUser(payload);
      res.json(user);
    } catch {
      res.status(400).send("Failed to create user");
    }
  });

  app.get(
    "/api/users/:userId",
    async (req: Request<{ userId: string }>, res) => {
      const { userId } = req.params;
      const user = await dao.findUserById(userId);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      res.json(user);
    }
  );
}

type Credentials = {
  username: string;
  password: string;
};
