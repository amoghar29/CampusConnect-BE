const handleAdminSignup = require("../controllers/auth/signup");
const isAdminSignedin = require("../controllers/auth/signin");
const router = require("express").Router();

router.post("/register", handleAdminSignup);
router.post("/login", isAdminSignedin);
module.exports = router;
