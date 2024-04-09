import { Router, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { validateAdmin } from "../middlewares/authValidation";

const { JOINTS_BASE_URL } = process.env;

const router = Router();

router.post("/", validateAdmin, async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const response = await fetch(`${JOINTS_BASE_URL}/api/meal-types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        createdBy: req.user.id,
        lastUpdatedBy: req.user.id,
      }),
    });
    const jsonResponse = await response.json();

    return res.status(response.status).json(jsonResponse);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${JOINTS_BASE_URL}/api/meal-types`);

    if (response.status !== 200) {
      return res.sendStatus(response.status);
    }

    const jsonResponse = await response.json();

    return res.status(response.status).json(jsonResponse);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await fetch(`${JOINTS_BASE_URL}/api/meal-types/${id}`);

    if (response.status !== 200) {
      return res.sendStatus(response.status);
    }

    const jsonResponse = await response.json();

    return res.status(response.status).json(jsonResponse);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.patch("/:id", validateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const response = await fetch(`${JOINTS_BASE_URL}/api/meal-types/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, lastUpdatedBy: req.user.id }),
    });

    const jsonResponse = await response.json();

    return res.status(response.status).json(jsonResponse);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/:id", validateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${JOINTS_BASE_URL}/api/meal-types/${id}`, {
      method: "DELETE",
    });

    return res.sendStatus(response.status);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
