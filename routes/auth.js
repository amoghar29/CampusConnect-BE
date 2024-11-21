const handleAdminSignup = require("../controllers/auth/signup");
const isAdminSignedin = require("../controllers/auth/signin");
const router = require("express").Router();

router.post("/signup", handleAdminSignup);
router.post("/signin", isAdminSignedin);
module.exports = router;
