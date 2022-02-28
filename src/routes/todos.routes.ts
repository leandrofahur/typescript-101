import { Router } from "express";
import { rmSync } from "fs";
import { Todo } from "../models/todo";

const router = Router();

let todos: Todo[] = [];
type RequestBody = { text: string };
type RequestParams = { id: string };

router.get("/", (req, res) => {
  res.status(200).json({ todos });
});

router.post("/todo", (req, res) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);
  res.status(200).json({ message: "Created todo!", newTodo });
});

router.put("/todo/:id", (req, res) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;
  const id = params.id;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index >= 0) {
    todos[index] = {
      id: todos[index].id,
      text: body.text,
    };

    return res.status(200).json({ message: "Updated todo!", todos });
  }

  res.status(404).json({ message: "Could not find valid id" });
});

router.delete("/todo/:id", (req, res) => {
  const params = req.params as RequestParams;
  todos = todos.filter((todo) => todo.id !== params.id);
  res.status(200).json({ message: "Deleted todo" });
});

export { router };
