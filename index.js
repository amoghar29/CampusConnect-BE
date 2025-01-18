const dotenv = require("dotenv");
const express = require("express");
const { connectToDb } = require("./connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");

const mongodbUrl = process.env.MONGODB_URL;
const PORT = process.env.PORT || 4000;
const app = express();

connectToDb(mongodbUrl).then(() => console.log("Connected to DB"));

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://campus-connect-fe.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});