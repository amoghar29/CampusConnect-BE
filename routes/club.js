const getAllClubs = require("../controllers/club/getClub.js");
const getClubById = require("../controllers/club/getClubById.js");
const addClub = require("../controllers/club/addClub.js");
const updateClubById = require("../controllers/club/updateClub.js");
const router = require("express").Router();

router.get("/", getAllClubs);
router.get("/:clubId", getClubById);
router.put("/:clubId", updateClubById);
router.post("/", addClub);

module.exports = router;
