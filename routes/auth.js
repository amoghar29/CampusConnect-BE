const handleUserSignup = require("../controllers/auth/signup");

const router = require("express").Router();

router.post("/", handleUserSignup);

module.exports = router;
