const router = require("express").Router();
const submitUserSuggestion = require("../controllers/suggestion/postSuggestion");
const getSuggestionByClub = require("../controllers/suggestion/getSuggestions");

router.post("/", submitUserSuggestion);
router.get("/", getSuggestionByClub);
module.exports = router;
