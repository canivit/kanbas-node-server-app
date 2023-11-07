import { Express, Request } from "express";

const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 100,
};

let todos: Todo[] = [
  {
    id: 1,
    title: "Task 1",
    description: "Task 1",
    due: "2023-09-09",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Task 2",
    due: "2023-09-10",
    completed: true,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Task 3",
    due: "2023-09-11",
    completed: false,
  },
  {
    id: 4,
    title: "Task 4",
    description: "Task 4",
    due: "2023-09-12",
    completed: true,
  },
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

  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
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

  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to delete Todo with id ${id}` });
      return;
    }

    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(200);
  });

  app.put(
    "/a5/todos/:id",
    (req: Request<{ id: string }, {}, Todo, {}, {}>, res) => {
      const { id } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      if (!todo) {
        res
          .status(404)
          .json({ message: `Unable to update Todo with id ${id}` });
        return;
      }

      todo.title = req.body.title;
      todo.description = req.body.description;
      todo.due = req.body.description;
      todo.completed = req.body.completed;
      res.sendStatus(200);
    }
  );
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

interface Todo {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
}
