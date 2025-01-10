require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../../models/admin");
const club = require("../../models/club");

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
      // Set cookie with proper settings
      console.log("Setting cookie with token:", access_token);
      res.cookie("access_token", access_token, {
        secure: false,
        sameSite: "Lax",
        httpOnly: true,
        expires: new Date(Date.now() + 900000),
        path: "/",
      });
     
      // if (!adminDetails.clubName) {
      //   return res.status(307).json({
      //     message: "Please register your club",
      //     redirect: "/admin/register-club",
      //   });
      // }

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
