import express from "express";
const todoRouter = express.Router();
import validateSchema from "../middlewares/schemaValidation.middleware";
import { createTodo, deleteTodo, editTodo, getEveryTodo, getTodo, searchNotes, updateIsPinned } from "../controllers";
import { createTodoSchema } from "../controllers/schemaValidations/todo.schema";
import { checkAuth } from "../middlewares/checkAuth.middleware";

todoRouter.post("/", checkAuth, validateSchema(createTodoSchema), createTodo);
todoRouter.get("/search", checkAuth, searchNotes)
todoRouter.get("/", checkAuth, getEveryTodo);
todoRouter.get("/:id", checkAuth, getTodo);
todoRouter.put("/pin-todo/:id", checkAuth, updateIsPinned);
todoRouter.put("/:id", checkAuth, editTodo);
todoRouter.delete("/:id", checkAuth, deleteTodo);

export { todoRouter };
