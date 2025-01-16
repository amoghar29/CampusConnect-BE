const getAllClubs = require("../controllers/club/getAllClubs.js");
const router = require("express").Router();

router.get("/", getAllClubs);


module.exports = router;
