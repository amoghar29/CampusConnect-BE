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

      return res.status(200).json({
        message: "Signin successful",
        debug: {
          cookieSet: true,
          environment: process.env.NODE_ENV
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