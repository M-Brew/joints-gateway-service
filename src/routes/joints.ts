import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { upload } from "../middlewares/uploadFile";
import { jointValidation } from "../middlewares/jointValidation";
import { validateAuth } from "../middlewares/authValidation";
dotenv.config();

const { JOINTS_BASE_URL } = process.env;

const router = Router();

router.post("/", validateAuth, async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const response = await fetch(`${JOINTS_BASE_URL}/api/joints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, createdBy: req.user.id }),
    });

    if (response.status === 201 || response.status === 400) {
      const jsonResponse = await response.json();
      return res.status(response.status).json(jsonResponse);
    }

    return res.sendStatus(response.status);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post(
  "/:id/avatar",
  validateAuth,
  jointValidation,
  upload.single("avatar"),
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
          `${JOINTS_BASE_URL}/api/joints/${id}/avatar`,
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

router.post(
  "/:id/gallery-image",
  validateAuth,
  jointValidation,
  upload.single("gallery-image"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res
          .status(400)
          .json({ error: "An error occurred. Please try again later." });
      }
      const { key, location } = req.file as any;

      const response = await fetch(
        `${JOINTS_BASE_URL}/api/joints/${id}/gallery-image`,
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
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${JOINTS_BASE_URL}/api/joints`);

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
    const response = await fetch(`${JOINTS_BASE_URL}/api/joints/${id}`);

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

router.patch(
  "/:id",
  validateAuth,
  jointValidation,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const response = await fetch(`${JOINTS_BASE_URL}/api/joints/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const jsonResponse = await response.json();

      return res.status(response.status).json(jsonResponse);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

router.delete(
  "/:id",
  validateAuth,
  jointValidation,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const response = await fetch(`${JOINTS_BASE_URL}/api/joints/${id}`, {
        method: "DELETE",
      });

      return res.sendStatus(response.status);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

router.delete(
  "/:id/avatar",
  validateAuth,
  jointValidation,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const response = await fetch(
        `${JOINTS_BASE_URL}/api/joints/${id}/avatar`,
        {
          method: "DELETE",
        }
      );

      return res.sendStatus(response.status);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

router.delete(
  "/:id/gallery-image/:key",
  validateAuth,
  jointValidation,
  async (req: Request, res: Response) => {
    try {
      const { id, key } = req.params;

      const response = await fetch(
        `${JOINTS_BASE_URL}/api/joints/${id}/gallery-image/${key}`,
        {
          method: "DELETE",
        }
      );

      const jsonResponse = await response.json();

      return res.status(response.status).json(jsonResponse);

      // return res.sendStatus(response.status);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
);

export default router;
