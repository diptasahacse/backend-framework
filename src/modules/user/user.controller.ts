import { Request, Response } from "express";
import { createUser, getUsers } from "./user.service";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const result = await getUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
