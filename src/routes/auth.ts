import { Router, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const { AUTH_BASE_URL } = process.env;

const router = Router();

router.post("/sign-up", async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const response = await fetch(`${AUTH_BASE_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const jsonResponse = await response.json();

    return res.status(response.status).send(jsonResponse);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/sign-in", async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const response = await fetch(`${AUTH_BASE_URL}/api/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const jsonResponse = await response.json();

    return res.status(response.status).send(jsonResponse);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/admin-sign-in", async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const response = await fetch(`${AUTH_BASE_URL}/api/auth/admin-sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const jsonResponse = await response.json();

    return res.status(response.status).send(jsonResponse);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/token", async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const response = await fetch(`${AUTH_BASE_URL}/api/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) {
      const jsonResponse = await response.json();

      return res.status(response.status).send(jsonResponse);
    }

    return res.sendStatus(response.status);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/sign-out", async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const response = await fetch(`${AUTH_BASE_URL}/api/auth/sign-out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return res.sendStatus(response.status);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/data", async (req: Request, res: Response) => {
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

    return res.status(response.status).send(jsonResponse);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
