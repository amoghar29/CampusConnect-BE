const dotenv = require("dotenv");
const express = require("express");
const { connectToDb } = require("./connection");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const mongodbUrl = process.env.MONGODB_URL;
const PORT = process.env.PORT || 4000;

const app = express();

//connection to db
connectToDb(mongodbUrl).then(() => console.log("connect to Db"));

// Middleware
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://campus-connect-fe.vercel.app", // Deployed frontend
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials
  })
);

app.use(express.json());
// app.use(cookieParser());

app.use("/api/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
