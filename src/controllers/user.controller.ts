import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../middlewares/errorHandler.middleware";
import { JWT_TOKEN } from "../config/env";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, lastname, birthdate } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser)
      return next(new ErrorResponse("Ya existe un usuario con ese email", 400));

    const user = new User({
      name,
      lastname,
      email,
      password,
      birthdate,
    });

    await user.save();

    res
      .status(201)
      .json({ error: false, message: "Cuenta creada correctamente", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Credenciales invalidas", 401));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorResponse("Contraseña incorrecta", 401));
    }

    const token = jwt.sign({ id: user._id }, JWT_TOKEN || "", {
      expiresIn: "1d",
    });

    res.status(200).json({ error: false, token });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user)

    res.status(200).json({
      error: false,
      user
    })
  } catch (error) {
    next(error)
  }
}