const router = require("express").Router();
const submitUserSuggestion = require("../controllers/suggestion/suggestion");

router.post("/", submitUserSuggestion);

module.exports = router;
