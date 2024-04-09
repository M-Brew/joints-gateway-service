import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const { JOINTS_BASE_URL } = process.env;

const jointValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${JOINTS_BASE_URL}/api/joints/${id}`);

    if (response.status === 200) {
      const jsonResponse = await response.json();
      if (jsonResponse.createdBy !== req.user.id) {
        return res.sendStatus(401);
      }
      
      next();
    } else {
      return res.sendStatus(response.status);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export { jointValidation };

export interface IJoint {
  name: string;
  slug: string;
  description?: string;
  avatar?: string;
  gallery?: string[];
  type: string;
  address: string;
  latitude: number;
  longitude: number;
  phoneNumber1: string;
  phoneNumber2?: string;
  menu?: string;
  createdBy: string;
}
