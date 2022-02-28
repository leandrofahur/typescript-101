import express from "express";
const app = express();

import { router as todosRoute } from "./routes/todos.routes";

app.use(express.json());
app.use(todosRoute);

app.listen(3000, function () {
  console.log("🚀 Server up and running on port 3000");
});
