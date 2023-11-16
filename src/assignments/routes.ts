import { Express, Request } from "express";
import { Assignment, db } from "../database/database";

export function assignmentRoutes(app: Express) {
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const assignmentId = parseInt(req.params.assignmentId);
    const index = db.assignments.findIndex((a) => a._id === assignmentId);
    if (index === -1) {
      res.sendStatus(404).send("Assignment not found");
      return;
    }
    db.assignments[index] = { ...req.body, _id: assignmentId };
    res.send(db.assignments[index]);
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const assignmentId = parseInt(req.params.assignmentId);
    const index = db.assignments.findIndex((a) => a._id === assignmentId);
    if (index === -1) {
      res.sendStatus(404).send("Assignment not found");
      return;
    }

    db.assignments.splice(index, 1);
    res.sendStatus(200);
  });

  app.post(
    "/api/courses/:courseId/assignments",
    (req: Request<{ courseId: string }, {}, Assignment, {}>, res) => {
      const courseId = parseInt(req.params.courseId);
      const course = db.courses.find((c) => c._id === courseId);
      if (!course) {
        res.sendStatus(404).send("Course not found");
        return;
      }
      const newAssignment = {
        ...req.body,
        course: courseId,
        _id: new Date().getTime(),
      };
      db.assignments.push(newAssignment);
      res.send(newAssignment);
    }
  );

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = db.assignments.filter(
      (a) => a.course === parseInt(courseId)
    );
    res.send(assignments);
  });
}
