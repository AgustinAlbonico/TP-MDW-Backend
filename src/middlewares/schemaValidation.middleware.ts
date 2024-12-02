import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ErrorResponse } from "./errorHandler.middleware";

const validateSchema = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new ErrorResponse(error.details[0].message, 400));
    }
    next();
  };
};

export default validateSchema;