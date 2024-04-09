import { Router, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { validateAdmin, validateAuth } from "../middlewares/authValidation";

const { JOINTS_BASE_URL } = process.env;

const router = Router();

router.post("/", validateAuth, async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const response = await fetch(`${JOINTS_BASE_URL}/api/menu`, {
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
    const response = await fetch(`${JOINTS_BASE_URL}/api/menu`);

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
    const response = await fetch(`${JOINTS_BASE_URL}/api/menu/${id}`);

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

router.get("/joint/:jointId", async (req: Request, res: Response) => {
  try {
    const { jointId } = req.params;
    const response = await fetch(`${JOINTS_BASE_URL}/api/menu/joint/${jointId}`);

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

router.patch("/:id", validateAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const response = await fetch(`${JOINTS_BASE_URL}/api/menu/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
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

router.delete("/:id", validateAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${JOINTS_BASE_URL}/api/menu/${id}`, {
      method: "DELETE",
    });

    return res.sendStatus(response.status);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
