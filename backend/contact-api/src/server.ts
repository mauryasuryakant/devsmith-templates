import express from "express";
import cors from "cors";

import contactRouter from "./routes/contact";

const app = express();

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRouter);

// Health check
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Devsmith backend is running.",
  });
});

app.listen(PORT, () => {
  console.log(`Devsmith backend running on http://localhost:${PORT}`);
});
