const Admin = require("../../models/admin");
async function getAdminInfo(req, res) {
  const adminId = req.adminId;
  const adminInfo = await Admin.findById(adminId);

  if (!adminInfo) {
    return res.status(404).json({ error: "No Details found" });
  }

  return res.status(200).json(adminInfo);
}
module.exports = getAdminInfo;
