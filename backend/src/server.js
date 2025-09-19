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
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);
// app.use((req, res, next) => {
//   console.log("Req method os ${req.method} & Req URL is ${req.url}");
//   next();
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is starting on PORT:", PORT);
  });
});
