import express from "express";

export const todoRouter = express.Router({ mergeParams: true });

todoRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`This will return task with ID ${id}`);
});
