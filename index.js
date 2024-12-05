const express = require("express");
require("dotenv").config({ path: "../.env" });
// const connectToDb  = require("./connection");
const feedbackRouter = require("./routes/feedback"); // Feedback Router
const suggestionRouter = require("./routes/suggestion");
const authRouter = require("./routes/auth");
const cors = require('cors');
const app = express();
const Router = express.Router(); // Main router
const mongodbUrl = process.env.MONGODB_URL;
const mongoose = require('mongoose')
// Middleware
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://campus-connect-fe.vercel.app' // Deployed frontend
];
app.use(cors({
  origin: '*', // Allow all origins (not recommended for production)
  credentials: true
}));
app.use(express.json()); // Parse JSON body

// Connect to the database
// connectToDb(mongodbUrl)
//   .then(() => console.log("Connected to DB"))
//   .catch((err) => console.error("DB connection failed:", err));

mongoose.connect("mongodb+srv://amogharlearns:qc1VkNPDcOGJuQwo@club-user-data.w643p.mongodb.net/")
// Attach feedback routes to the router
Router.use("/feedback", feedbackRouter);
Router.use("/suggestion", suggestionRouter);
Router.use("/admin", authRouter);
// Use the router in the app
app.use(Router);

// Start the server
const PORT = process.env.PORT || 4000; // Default to 4000 if PORT is not set
app.listen(PORT, () => {
  // console.log(`Server started at port ${PORT}`); // Log the actual port being used
}).on('error', (err) => {
  // console.error("Server failed to start:", err); // Log any startup errors
});
