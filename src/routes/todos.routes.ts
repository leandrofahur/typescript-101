import { Router } from "express";
import { rmSync } from "fs";
import { Todo } from "../models/todo";

const router = Router();

let todos: Todo[] = [];

router.get("/", (req, res) => {
  res.status(200).json({ todos });
});

router.post("/todo", (req, res) => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };

  todos.push(newTodo);
  res.status(200).json({ message: "Created todo!", newTodo });
});

router.put("/todo/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index >= 0) {
    todos[index] = {
      id: todos[index].id,
      text: req.body.text,
    };

    return res.status(200).json({ message: "Updated todo!", todos });
  }

  res.status(404).json({ message: "Could not find valid id" });
});

router.delete("/todo/:id", (req, res) => {
  todos = todos.filter((todo) => todo.id !== req.params.id);
  res.status(200).json({ message: "Deleted todo" });
});

export { router };
