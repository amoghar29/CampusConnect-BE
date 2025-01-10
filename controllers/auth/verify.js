const jwt = require("jsonwebtoken");

async function handleVerifyCookie(req, res) {
  const access_token = req.cookies.access_token;
  if (!access_token) {
    return res.status(401).json({
      msg: "Please login first",
      cookies: req.cookies,
      headers: req.headers,
    });
  }
  try {
    const decoded = jwt.verify(access_token, process.env.SECRET_KEY);
    return res.status(200).json({ access_token: access_token ,admin: decoded });
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token",
      error: error.message,
    });
  }
}
module.exports = handleVerifyCookie;