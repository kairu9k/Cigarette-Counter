import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();
console.log(process.env.DB);

const app = express();
const PORT = process.env.PORT || 5001;

// Validate required environment variables
if (!process.env.DB) {
  console.error("ERROR: DB environment variable is required");
  process.exit(1);
}

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.warn("WARNING: Upstash Redis credentials not found. Rate limiting may not work properly.");
}
const __dirname = path.resolve();

//middleware
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
  })
);
app.use(express.json());
app.use(rateLimiter);
app.use("/api/entries", notesRoutes);
// app.use((req, res, next) => {
//   console.log("Req method os ${req.method} & Req URL is ${req.url}");
//   next();
// });

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is starting on PORT:", PORT);
  });
});
