const { StatusCodes } = require("http-status-codes");
const Profile = require("../models/Profile");

const getAllProfiles = async (req, res) => {
  const profiles = await Profile.find({});
  res.status(StatusCodes.OK).json({ nth: profiles.length, profiles });
};

const getProfile = async (req, res) => {
  const { userId } = req.user;
  const profile = await Profile.findOne({ user: userId });
  res.status(StatusCodes.OK).json({ profile });
};
const updateProfile = async (req, res) => {
  res.send("update profile");
};
const deleteProfile = async (req, res) => {
  res.send("delete profile");
};
module.exports = {
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
};
