import { Express } from "express";
import { Course, db } from "../database/database";
import { Request } from "express";

export function courseRoutes(app: Express) {
  app.get("/api/courses", (_req, res) => {
    res.send(db.courses);
  });

  app.post("/api/courses", (req: Request<{}, {}, Course, {}>, res) => {
    const course = { ...req.body, _id: new Date().getTime() };
    db.courses.push(course);
    res.send(course);
  });

  app.delete("/api/courses/:id", (req: Request<{ id: string }>, res) => {
    const courseId = parseInt(req.params.id);
    const index = db.courses.findIndex((c) => c._id === courseId);
    if (index === -1) {
      res.sendStatus(404).send("Course not found");
      return;
    }

    db.courses.splice(index, 1);
    res.sendStatus(200);
  });

  app.put(
    "/api/courses/:id",
    (req: Request<{ id: string }, {}, Course, {}>, res) => {
      const courseId = parseInt(req.params.id);
      const index = db.courses.findIndex((c) => c._id === courseId);
      if (index === -1) {
        res.sendStatus(404).send("Course not found");
        return;
      }

      db.courses[index] = { ...req.body, _id: courseId };
      res.send(db.courses[index]);
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
