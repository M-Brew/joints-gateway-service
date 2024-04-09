import { Router, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { validateAuth } from "../middlewares/authValidation";
import { upload } from "../middlewares/uploadFile";

const { JOINTS_BASE_URL } = process.env;

const router = Router();

router.post("/", validateAuth, async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const response = await fetch(`${JOINTS_BASE_URL}/api/meals`, {
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
    const response = await fetch(`${JOINTS_BASE_URL}/api/meals`);

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
    const response = await fetch(`${JOINTS_BASE_URL}/api/meals/${id}`);

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

    const response = await fetch(`${JOINTS_BASE_URL}/api/meals/${id}`, {
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

router.delete("/:id", validateAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${JOINTS_BASE_URL}/api/meals/${id}`, {
      method: "DELETE",
    });

    return res.sendStatus(response.status);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post(
  "/:id/image",
  validateAuth,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res
          .status(400)
          .json({ error: "An error occurred. Please try again later." });
      }

      const { key, location } = req.file as any;

      if (key) {
        const response = await fetch(
          `${JOINTS_BASE_URL}/api/meals/${id}/image`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              key,
              imageURL: location,
            }),
          }
        );

        if (response.status !== 200) {
          return res.sendStatus(response.status);
        }

        const jsonResponse = await response.json();

        return res.status(response.status).json(jsonResponse);
      } else {
        return res.sendStatus(500);
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

router.delete(
  "/:id/image",
  validateAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const response = await fetch(`${JOINTS_BASE_URL}/api/meals/${id}/image`, {
        method: "DELETE",
      });

      const jsonResponse = await response.json();

      return res.status(response.status).json(jsonResponse);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

export default router;
