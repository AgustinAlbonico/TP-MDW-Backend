import { NextFunction, Response, Request } from "express";
import { Todo } from "../models/todo.model";
import { ErrorResponse } from "../middlewares/errorHandler.middleware";
import { error } from "console";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, tags } = req.body;

  try {
    const todo = await Todo.create({
      title,
      description,
      tags,
      user: req.user,
    });

    res.status(200).json({
      error: false,
      message: "Nota creada correctamente",
      todo,
    });
  } catch (error) {
    next(error);
  }
};

export const editTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, tags, isPinned } = req.body;
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({ _id: id, user: req.user });

    if (!todo) return next(new ErrorResponse("Nota no encontrada", 404));

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (tags) todo.tags = tags;
    if (isPinned) todo.isPinned = isPinned;

    await todo.save();

    res.status(200).json({
      error: false,
      message: "Nota editada correctamente",
      todo,
    });
  } catch (error) {
    next(error);
  }
};

export const getEveryTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await Todo.find({
      user: req.user,
    }).sort({
      isPinned: -1,
    });

    res.status(200).json({
      error: false,
      todos,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await Todo.findById(req.params.id);

    res.status(200).json({
      error: false,
      todo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findOne({ _id: id, user: req.user });

    if (!todo) return next(new ErrorResponse("Nota no encontrada", 404));

    await Todo.deleteOne({ _id: id, user: req.user });

    res.status(200).json({
      error: false,
      message: "Nota eliminada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export const updateIsPinned = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isPinned } = req.body;
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({ _id: id, user: req.user });

    if (!todo) return next(new ErrorResponse("Nota no encontrada", 404));

    todo.isPinned = !todo.isPinned;

    await todo.save();

    res.status(200).json({
      error: false,
      message: "Nota editada correctamente",
      todo,
    });
  } catch (error) {
    next(error);
  }
};

export const searchNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { query } = req.query;

  query = String(query); //Si no hago esto me da problema el RegExp

  if (!query) return next(new ErrorResponse("Query necesaria", 400));
  try {
    const matchedNotes = await Todo.find({
      user: req.user,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { description: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.status(200).json({
      error: false,
      todos: matchedNotes,
      message: "Notas encontradas con éxito"
    })
  } catch (error) {
    next(error);
  }
};
