import sendQuery from "../controllers/chatbot/sendQuery";
const router = require("express").Router();

router.post("/send-query", sendQuery);
