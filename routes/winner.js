const router = require("express").Router();
const getAllWinners = require("../controllers/winner/winner");

router.get("/", getAllWinners);

module.exports = router;
