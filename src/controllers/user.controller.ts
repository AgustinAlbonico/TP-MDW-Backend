import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../middlewares/errorHandler.middleware";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName, birthDate } = req.body;

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      birthDate,
    });

    res.status(201).json({ error: false, message: "Cuenta creada correctamente", user});
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};
