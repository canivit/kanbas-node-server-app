import { Express, Request } from "express";
import * as dao from "./dao";
import { User } from "./schema";

declare module "express-session" {
  interface SessionData {
    currentUser: User;
  }
}

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

      req.session.currentUser = user;
      res.send(user);
    }
  );

  app.post(
    "/api/users/signup",
    async (req: Request<{}, {}, Credentials>, res) => {
      let user = await dao.findUserByUsername(req.body.username);
      if (user !== null) {
        res.status(400).send("Username already taken");
        return;
      }

      user = await dao.createUser(req.body);
      req.session.currentUser = user;
      res.json(user);
    }
  );

  app.get("/api/users/account", async (req, res) => {
    if (!req.session.currentUser) {
      res.status(401).send("Not signed in");
      return;
    }

    res.send(req.session.currentUser);
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

  app.get("/api/users/signout", async (req, res) => {
    req.session.destroy(() => {});
    res.sendStatus(200);
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

  app.delete(
    "/api/users/:userId",
    async (req: Request<{ userId: string }>, res) => {
      const { userId } = req.params;
      const result = await dao.deleteUser(userId);
      res.json(result);
    }
  );
}

type Credentials = {
  username: string;
  password: string;
};
