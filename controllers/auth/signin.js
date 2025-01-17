require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../../models/admin");

const secretKey = process.env.SECRET_KEY;

async function handleAdminSignin(req, res) {
  const { email, password } = req.body;

  try {
    const adminDetails = await Admin.findOne({ email });
    if (!adminDetails) {
      return res.status(401).json({ error: "User not found" });
    }

    const storedPassword = adminDetails.password;
    const match = await bcrypt.compare(password, storedPassword);

    if (match) {
      const access_token = jwt.sign(
        {
          email: adminDetails.email,
          clubName: adminDetails.clubName,
          clubId: adminDetails.clubId,
        },
        secretKey,
        {
          expiresIn: "24h",
        }
      );

      const isProduction = process.env.NODE_ENV === "production";

      res.cookie("access_token", access_token, {
        secure: isProduction,
        sameSite: "Lax",
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: "/",
      });
      return res.status(200).json({
        message: "Signin successful",
        debug: {
          cookieSet: true,
        },
      });
    } else {
      return res.status(401).json({ error: "Incorrect email or password" });
    }
  } catch (error) {
    console.error("Error :", error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = handleAdminSignin;
