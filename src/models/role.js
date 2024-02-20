const mongoose = require("mongoose");

exports.ROLES = ["user", "admin", "moderator"];

const roleSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Role", roleSchema);
