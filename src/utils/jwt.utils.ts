import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "../config/env";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) return res.sendStatus(401);

  jwt.verify(token, JWT_TOKEN, (error, user) => {
    if(error) return res.sendStatus(401)
    req.user = user as string;
  })
};
