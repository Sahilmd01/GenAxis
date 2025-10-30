import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import chalk from "chalk";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();

//CONNECT TO CLOUDINARY 
try {
  await connectCloudinary();
  console.log(chalk.blueBright("☁️ Cloudinary connection established successfully."));
} catch (error) {
  console.error(chalk.red("❌ Failed to connect to Cloudinary:"), error.message);
  process.exit(1); // Stop the server if Cloudinary fails to connect
}

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

//BASIC ROUTE
app.get("/", (req, res) => {
  res.send("✅ Server is live and running smoothly, Sahil!");
});

//REQUEST LOGGER
app.use((req, res, next) => {
  console.log(chalk.magenta(`🚀 ${req.method} ${req.url}`));
  next();
});

//ROUTES
app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

//ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(chalk.red("⚠️ Server Error:"), err.message);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server. Please try again later.",
  });
});

//START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(chalk.green(`🌐 Server is running at: http://localhost:${PORT}`));
  console.log(chalk.gray("---------------------------------------------------"));
  console.log(chalk.cyan("💖 Thanks for using this server!"));
  console.log(
    chalk.yellow("⭐ Support the project on GitHub: https://github.com/sahilmd01/GenAxis")
  );
  console.log(chalk.gray("---------------------------------------------------"));
});
