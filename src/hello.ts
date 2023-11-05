import { Express } from "express";

export function hello(app: Express) {
  app.get("/hello", (_req, res) => {
    res.send("Life is good!!");
  });

  app.get("/", (_req, res) => {
    res.send("Welcome to Full Stack Development!");
  });
}
