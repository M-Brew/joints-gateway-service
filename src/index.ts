import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth";
import jointTypeRoutes from "./routes/jointTypes";
import mealTypeRoutes from "./routes/mealTypes";
import menuTypeRoutes from "./routes/menuTypes";
import jointRoutes from "./routes/joints";
import menuRoutes from "./routes/menu";
import mealRoutes from "./routes/meals";

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/joint-types", jointTypeRoutes);
app.use("/api/meal-types", mealTypeRoutes);
app.use("/api/menu-types", menuTypeRoutes);
app.use("/api/joints", jointRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/meals", mealRoutes);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
