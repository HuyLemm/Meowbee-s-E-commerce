import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDatabase } from "./config/database.js";
// import sessionConfig from "./config/session.js";
import routes from "./routes/route.js";
// import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Database
await connectDatabase();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(sessionConfig);

// Routes
app.use("/api", routes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});