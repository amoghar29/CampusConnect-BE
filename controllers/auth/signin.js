require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../../models/admin");

const secretKey = process.env.SECRET_KEY;

async function isAdminSignedin(req, res) {
  const { email, inputPassword } = req.body;

  try {
    // Find admin by email
    const adminDetails = await Admin.findOne({ email });
    if (!adminDetails) {
      return res.status(401).json({ error: "Admin not found" });
    }

    // Compare passwords
    const storedPassword = adminDetails.password;
    const match = await bcrypt.compare(inputPassword, storedPassword);

    if (match) {
      // Generate JWT token
      const accessToken = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
      return res.status(200).json({ accessToken });
    } else {
      return res.status(401).json({ error: "Wrong password" });
    }
  } catch (error) {
    console.error("Error in isAdminSignedin:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = isAdminSignedin;
