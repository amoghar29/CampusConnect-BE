const router = require("express").Router();
const submitUserSuggestion = require("../controllers/suggestion/postSuggestion");
const getSuggestionByClub = require("../controllers/admin/getSuggestions");

router.post("/", submitUserSuggestion);
module.exports = router;
