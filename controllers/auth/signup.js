require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin");
const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

async function handleAdminSignup(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: "Email and password are required" 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: "Invalid email format" 
      });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ 
        error: "Email already registered" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword
    });

    // Generate JWT token for auto-login
    const access_token = jwt.sign(
      {
        email: newAdmin.email,
        clubName: newAdmin.clubName,
        clubId: newAdmin.clubId,
      },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    // Set cookie with appropriate options
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: "/",
    };

    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
      cookieOptions.sameSite = "None";
    } else {
      cookieOptions.secure = false;
      cookieOptions.sameSite = "Lax";
    }

    res.cookie("access_token", access_token, cookieOptions);

    return res.status(201).json({
      message: "Signup successful",
      redirectUrl: "/admin/register-club"
    });

  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ 
      error: "An error occurred during registration" 
    });
  }
}

module.exports = handleAdminSignup;
