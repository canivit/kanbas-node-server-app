import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import users from "./users.json";
import enrollments from "./enrollments.json";
import grades from "./grades.json";

export type Course = (typeof courses)[0];
export type Module = (typeof modules)[0];
export type Assignment = (typeof assignments)[0];
export type User = (typeof users)[0];
export type Enrollment = (typeof enrollments)[0];
export type Grade = (typeof grades)[0];

export type Database = {
  courses: Course[];
  modules: Module[];
  assignments: Assignment[];
  users: User[];
  enrollments: Enrollment[];
  grades: Grade[];
};

const db: Database = {
  courses,
  modules,
  assignments,
  users,
  enrollments,
  grades,
};

export { db };
