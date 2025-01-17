const handleAdminSignup = require("../controllers/auth/signup");
const handleAdminSignin = require("../controllers/auth/signin");
const handleVerifyCookie = require("../controllers/auth/verify");
const handleAdminSignout = require("../controllers/auth/signout");
const router = require("express").Router();

router.post("/signup", handleAdminSignup);
router.post("/signin", handleAdminSignin);
router.get("/verify", handleVerifyCookie);
router.post("/signout", handleAdminSignout);
module.exports = router;
