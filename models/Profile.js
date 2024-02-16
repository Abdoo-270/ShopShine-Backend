const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    bio: {
      type: String,
      default: "new user",
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
