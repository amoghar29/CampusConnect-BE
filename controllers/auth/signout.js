function handleAdminSignout(req, res) {
  res.clearCookie("access_token", { path: "/" }); // Clear the cookie
  res.status(200).json({ message: "Logged out successfully" });
}

module.exports = handleAdminSignout;
