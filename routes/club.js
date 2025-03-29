const {getAllClubs} = require("../controllers/club/getAllClubs.js");
const {getAllClubNames} = require("../controllers/club/getAllClubs.js");
const router = require("express").Router();

router.get("/", getAllClubs);
router.get("/allClubNames",getAllClubNames)
module.exports = router;
