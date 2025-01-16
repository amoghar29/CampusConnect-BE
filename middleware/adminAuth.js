const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const getAdmin = async (email) => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return null;
    }
    return admin;
  } catch (error) {
    console.error("Error finding admin:", error);
    return null;
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;
    
    if (!access_token) {
      return res.status(401).json({
        msg: "Please login first",
        cookies: req.cookies,
        headers: req.headers,
      });
    }

    const decoded = jwt.verify(access_token, process.env.SECRET_KEY);

    const admin = await getAdmin(decoded.email);
    if (!admin) {
      return res.status(401).json({ msg: "Admin not found" });
    }

    req.adminId = admin._id;
    req.clubId = admin.clubId;
    req.adminEmail = admin.email;
    req.clubName = admin.clubName;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({
      msg: "Authentication failed",
      error: error.message,
    });
  }
};

// const checkAdminOwnership = async (req, res, next) => {
//   try {
//     const resourceClubName = req.params.clubName || req.body.clubName;

//     if (req.admin.clubName !== resourceClubName) {
//       return res.status(403).json({
//         error: "Unauthorized: You can only access resources for your own club",
//       });
//     }

//     next();
//   } catch (error) {
//     res.status(500).json({ error: "Error checking resource ownership" });
//   }
// };

module.exports = adminAuth;
