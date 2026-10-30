const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");

// Route files
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobsRoutes");
const profileRoutes = require("./routes/profileRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Error middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("GIU Nexus API Running...");
});

// Make sure the database is connected before handling any request
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/admin", adminRoutes);

// Error Handler (must be last)
app.use(errorHandler);

// Start server locally; on Vercel the app is exported instead
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
