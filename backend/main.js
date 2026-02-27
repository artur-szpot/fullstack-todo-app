import express from "express";
import { configDotenv } from "dotenv";
import { todoRouter } from "./src/todo/todo.js";

const app = express();
const config = configDotenv();
const port = config.parsed.APP_PORT ?? 3001;

app.use("/todo", todoRouter);

app.listen(port, () => {
  console.log(`ToDo app started on port ${port}`);
});
