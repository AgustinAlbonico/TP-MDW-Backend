import Joi from "joi";
import { ITodo } from "../../interfaces";

const createTodoSchema = Joi.object<ITodo>({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  tags: Joi.array().items(Joi.string()),
});

export { createTodoSchema };
