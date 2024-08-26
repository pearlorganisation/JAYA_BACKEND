import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import morgan from "morgan";
import connectDB from "./src/configs/db.js";
import { rateLimit } from "express-rate-limit";
import { error } from "./src/middlewares/error.js";

const app = express();
const PORT = process.env.PORT || 7000;

// @@---MIDDLEWARES--------------------------------
const limiter = rateLimit({
  max: 100, // Maximum requested for api calls/IP
  windowMs: 60 * 60 * 1000, // Within 1 hour
  message: "Too many requests, please try again later",
});

dotenv.config();
app.use(
  cors(
    process.env.NODE_ENV === "production"
      ? {
          origin: ["http://localhost:4112", "http://localhost:5010", "*"],
          credentials: true,
        }
      : {
          origin: ["http://localhost:4112", "http://localhost:5174", "*"],
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
          credentials: true,
          maxAge: 600,
          exposedHeaders: ["*", "Authorization"],
        }
  )
);
app.use(express.json());
app.use("/api", limiter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan());
}

// @@---Route-Section--------------------------------
import authRoutes from "./src/routes/auth.js";
import schemesRoutes from "./src/routes/govermentSchemes.js";
import documentsRoutes from "./src/routes/documents.js";

// ---------------

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/schemes", schemesRoutes);
app.use("/api/v1/documents", documentsRoutes);
app.use(error);

// @@---MONGODB--------------------------------------
app.listen(PORT, () => {
  connectDB();
  console.log(chalk.white.bold.bgGreen(`LISTENNING TO PORT-${PORT}`));
});
