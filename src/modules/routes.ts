import { Express, Request } from "express";
import { Module, db } from "../database/database";

export function moduleRoutes(app: Express) {
  app.put("/api/modules/:moduleId", (req, res) => {
    const moduleId = parseInt(req.params.moduleId);
    const index = db.modules.findIndex((m) => m._id === moduleId);
    if (index === -1) {
      res.sendStatus(404).send("Module not found");
      return;
    }
    db.modules[index] = { ...req.body, _id: moduleId };
    res.send(db.modules[index]);
  });

  app.delete("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const index = db.modules.findIndex((m) => m._id === parseInt(moduleId));
    if (index === -1) {
      res.sendStatus(404).send("Module not found");
      return;
    }
    db.modules.splice(index, 1);
    res.sendStatus(200);
  });

  app.post(
    "/api/courses/:courseId/modules",
    (req: Request<{ courseId: string }, {}, Module, {}>, res) => {
      const { courseId } = req.params;
      const newModule = {
        ...req.body,
        course: parseInt(courseId),
        _id: new Date().getTime(),
      };
      db.modules.push(newModule);
      res.send(newModule);
    }
  );

  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = db.modules.filter((m) => m.course === parseInt(courseId));
    res.send(modules);
  });
}
