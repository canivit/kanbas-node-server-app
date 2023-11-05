import { Express } from "express";

export function lab5(app: Express) {
  app.get("/a5/welcome", (_req, res) => {
    res.send("Welcome to Assignment 5");
  });
}
