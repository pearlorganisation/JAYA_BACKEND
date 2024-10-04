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
  max: 100000, // Maximum requested for api calls/IP
  windowMs: 60 * 60 * 1000, // Within 1 hour
  message: "Too many requests, please try again later",
});

dotenv.config();
app.use(
  cors(
    process.env.NODE_ENV === "production"
      ? {
          origin: ["http://localhost:4112", "http://localhost:5010", "*","https://jaya-mern.vercel.app/"],
          credentials: true,
        }
      : {
          origin: [
            "http://localhost:4112",
            "http://localhost:5173",
            "http://localhost:5174",
            "https://jaya-mern.vercel.app/",
            "*",
          ],
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
          credentials: true,
          maxAge: 600,
          exposedHeaders: ["*", "Authorization"],
        }
  )
);
app.use(morgan("dev"));
app.use(express.json());

// app.use("/api", limiter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan());
}

// @@---Route-Section--------------------------------
import authRoutes from "./src/routes/auth.js";
import schemesRoutes from "./src/routes/govermentSchemes.js";
import documentsRoutes from "./src/routes/documents.js";
import blogRoutes from "./src/routes/blogs.js";
import { userDataRoutes } from "./src/routes/userData.js";
import { schemeRouter } from "./src/routes/scheme.js";
import { bookmarkRouter } from "./src/routes/bookmark.js";
// ---------------

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/schemes", schemesRoutes);
app.use("/api/v1/documents", documentsRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/userData", userDataRoutes);
app.use("/api/v1/scheme", schemeRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);
app.use(error);

// @@---MONGODB--------------------------------------
app.listen(PORT, () => {
  connectDB();
  console.log(chalk.white.bold.bgGreen(`LISTENNING TO PORT-${PORT}`));
});
