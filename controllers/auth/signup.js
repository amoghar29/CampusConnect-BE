const bcrypt = require("bcrypt");
const Admin = require("../../models/admin");
const saltRounds = 5;
async function handleAdminSignup(req, res) {
  const { email, password, clubName } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const adminDetails = await Admin.create({
      email: email,
      password: hashedPassword,
      clubName: clubName,
    });
    return res
      .status(200)
      .json({ success: "signup successfull", adminDetails });
  } catch (err) {
    console.error("Error during signup:", err);

    return res.status(400).json({ err: "error occured during registration" });
  }
}

module.exports = handleAdminSignup;
