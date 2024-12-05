const express = require("express");
require("dotenv").config({ path: "../.env" });
const { connectToDb } = require("../connection");
const feedbackRouter = require("./feedback"); // Feedback Router
const suggestionRouter = require("./suggestion");
const authRouter = require("./auth");
const app = express();
const Router = express.Router(); // Main router
const mongodbUrl = process.env.MONGODB_URL;

// Middleware
app.use(express.json()); // Parse JSON body

// Connect to the database
connectToDb(mongodbUrl)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection failed:", err));

// Attach feedback routes to the router
Router.use("/feedback", feedbackRouter);
Router.use("/suggestion", suggestionRouter);
Router.use("/admin", authRouter);
// Use the router in the app
app.use(Router);

// Start the server
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`); // Log the actual port being used
}).on('error', (err) => {
  console.error("Server failed to start:", err); // Log any startup errors
});
