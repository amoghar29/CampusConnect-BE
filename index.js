const dotenv = require("dotenv");
const express = require("express");
const { connectToDb } = require("./connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");

const mongodbUrl = process.env.MONGODB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL
const app = express();

connectToDb(mongodbUrl).then(() => console.log("Connected to DB"));

// Middleware
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// CORS headers middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
