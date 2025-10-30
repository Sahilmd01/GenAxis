import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();

// Connect to Cloudinary before starting the server
try {
  await connectCloudinary();
  console.log("☁️ Cloudinary connection established successfully.");
} catch (error) {
  console.error("❌ Failed to connect to Cloudinary:", error.message);
  process.exit(1); // Stop the server if Cloudinary fails to connect
}

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// --- BASIC ROUTE ---
app.get("/", (req, res) => {
  res.send("✅ Server is live and running smoothly!");
});

// --- REQUEST LOGGER ---
app.use((req, res, next) => {
  console.log(`🚀 ${req.method} ${req.url}`);
  next();
});

// --- ROUTES ---
app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

// --- ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error("⚠️ Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server. Please try again later.",
  });
});

// --- START SERVER ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌐 Server is running at: http://localhost:${PORT}`);
});
