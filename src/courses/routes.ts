import { Express } from "express";
import { Course, db } from "../database/database";
import { Request } from "express";

export function courseRoutes(app: Express) {
  app.get("/api/courses", (_req, res) => {
    res.json(db.courses);
  });

  app.post("/api/courses", (req: Request<{}, {}, Course, {}>, res) => {
    const course = { ...req.body, _id: new Date().getTime() };
    db.courses.push(course);
    res.send(course);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    db.courses = db.courses.filter((c) => c._id !== parseInt(id));
    res.sendStatus(204);
  });

  app.put(
    "/api/courses/:id",
    (req: Request<{ id: string }, {}, Course, {}>, res) => {
      const { id } = req.params;
      const course = req.body;
      db.courses = db.courses.map((c) =>
        c._id === parseInt(id) ? { c, ...course } : c
      );
      res.sendStatus(204);
    }
  );

  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = db.courses.find((c) => c._id === parseInt(id));
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });
}
