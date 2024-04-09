import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const { AUTH_BASE_URL } = process.env;

import { IUserPayload } from "types/custom";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUserPayload;
  }
}

export const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/api/auth/data`, {
      headers: {
        Authorization: req.headers["authorization"],
      },
    });

    if (response.status !== 200) {
      return res.sendStatus(response.status);
    }

    const jsonResponse = await response.json();

    req.user = jsonResponse as IUserPayload;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const validateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/api/auth/data`, {
      headers: {
        Authorization: req.headers["authorization"],
      },
    });

    if (response.status !== 200) {
      return res.sendStatus(response.status);
    }

    const jsonResponse = await response.json() as IUserPayload;

    if (jsonResponse.role !== "admin") {
      return res.sendStatus(403);
    }

    req.user = jsonResponse;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
