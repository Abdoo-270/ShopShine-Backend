const express = require("express");
const router = express.Router();
const {
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllProfiles);
router
  .route("/:id")
  .get(authenticateUser, getProfile)
  .patch(authenticateUser, updateProfile)
  .delete(authenticateUser, deleteProfile);

module.exports = router;
