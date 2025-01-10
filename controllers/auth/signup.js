const bcrypt = require("bcrypt");
const Admin = require("../../models/admin");
const saltRounds = 10;

async function handleAdminSignup(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        error: "Email and password are required" 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: "Invalid email format" 
      });
    }

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ 
        error: "Email already registered" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin
    await Admin.create({
      email,
      password: hashedPassword
    });

    return res.status(201).json({ 
      message: "Signup successful",
      redirectUrl: "/signin"
    });

  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ 
      error: "An error occurred during registration" 
    });
  }
}

module.exports = handleAdminSignup;
