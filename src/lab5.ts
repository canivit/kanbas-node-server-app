import { Express, Request } from "express";

const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 100,
};

let todos = [
  { id: 1, title: "Task 1", description: "Task 1", completed: false },
  { id: 2, title: "Task 2", description: "Task 2", completed: true },
  { id: 3, title: "Task 3", description: "", completed: false },
  { id: 4, title: "Task 4", description: "", completed: true },
];

const todosCopy = JSON.parse(JSON.stringify(todos));

export function lab5(app: Express) {
  app.get("/a5/welcome", (_req, res) => {
    res.send("Welcome to Assignment 5");
  });

  app.get("/a5/add/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  });

  app.get("/a5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) - parseInt(b);
    res.send(sum.toString());
  });

  app.get(
    "/a5/calculator",
    (req: Request<{}, {}, {}, CalculatorQuery>, res) => {
      const { a, b, operation } = req.query;
      let result: number | "Invalid Operation" = 0;
      switch (operation) {
        case "add":
          result = parseInt(a) + parseInt(b);
          break;
        case "subtract":
          result = parseInt(a) - parseInt(b);
          break;
        default:
          result = "Invalid Operation";
      }
      res.send(result.toString());
    }
  );

  app.get("/a5/assignment", (_req, res) => {
    res.json(assignment);
  });

  app.get("/a5/assignment/title", (_req, res) => {
    res.json(assignment.title);
  });

  app.get(
    "/a5/assignment/title/:newTitle",
    (req: Request<AssignmentParams>, res) => {
      const { newTitle } = req.params;
      assignment.title = newTitle;
      res.json(assignment);
    }
  );

  app.get(
    "/a5/assignment/score/:newScore",
    (req: Request<AssignmentParams>, res) => {
      const { newScore } = req.params;
      assignment.score = newScore;
      res.json(assignment);
    }
  );

  app.get(
    "/a5/assignment/completed/:newCompleted",
    (req: Request<AssignmentParams>, res) => {
      const { newCompleted } = req.params;
      assignment.completed = newCompleted;
      res.json(assignment);
    }
  );

  app.get("/a5/todos", (req: Request<{}, {}, {}, TodoQuery>, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedTodos = todos.filter(
        (t) => t.completed === (completed === "true")
      );
      res.json(completedTodos);
      return;
    }

    res.json(todos);
  });

  app.get("/a5/todos/reset", (_req, res) => {
    todos = JSON.parse(JSON.stringify(todosCopy));
    res.json(todos);
  });

  app.get("/a5/todos/create", (_req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      description: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Not Found");
      return;
    }

    res.json(todo);
  });

  app.get("/a5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Not Found");
      return;
    }

    todos.splice(todos.indexOf(todo), 1);
    res.json(todos);
  });

  app.get("/a5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Not Found");
      return;
    }

    todo.title = title;
    res.json(todos);
  });

  app.get("/a5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Not Found");
      return;
    }

    todo.completed = completed === "true";
    res.json(todos);
  });

  app.get("/a5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Not Found");
      return;
    }

    todo.description = description;
    res.json(todos);
  });
}

interface CalculatorQuery {
  a: string;
  b: string;
  operation: "add" | "subtract";
}

interface AssignmentParams {
  newTitle: string;
  newScore: number;
  newCompleted: boolean;
}

interface TodoQuery {
  completed: string;
}
