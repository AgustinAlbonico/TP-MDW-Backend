import { Request, Response, NextFunction } from "express"
import { User } from "../models/user.model";
import bcrypt from "bcrypt"

export const register = async (req: Request, res: Response) => {
    const {name, lastname, email, password, birthdate} = req.body;

    const formattedDate = new Date(birthdate);

    const foundUser = await User.findOne({email})

    if(foundUser) return res.status(400).json({message: "El email ya esta en uso"})

    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await User.create({
        birthdate: formattedDate,
        name,
        lastname,
        password: hashedPassword,
        email,
    })  

    return
}