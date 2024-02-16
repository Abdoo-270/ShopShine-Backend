const router = require("../routes/userRoutes");
const Offer = require("../models/Offer");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { query } = require("express");

const createOffer = async (req, res) => {
  const { userId } = req.user;
  req.body.user = userId;
  const user = await User.findById(userId);
  req.body.userName = user.name;
  req.body.userPhoneNumber = user.phoneNumber;
  const offer = await Offer.create(req.body);
  res.status(StatusCodes.CREATED).json({ offer });
};

const getAllOffers = async (req, res) => {
  const { departurePlace, arrivalPlace, searchDate } = req.query;
  let query = {};

  if (departurePlace) {
    query.departureCity = departurePlace;
  }

  if (arrivalPlace) {
    query.arrivalCity = arrivalPlace;
  }
  if (searchDate) {
    query.leavingDate = searchDate;
  }

  const offers = await Offer.find(query);
  res.status(StatusCodes.OK).json({ nth: offers.length, offers });
};
const getSingleOffer = async (req, res) => {
  const { id: offerId } = req.params;
  const offer = await Offer.findOne({ _id: offerId });
  if (!offer) {
    throw new CustomError.NotFoundError(`No offer with id : ${offerId}`);
  }
  res.status(StatusCodes.OK).json({ offer });
};

const updateOffer = async (req, res) => {
  const { id: offerId } = req.params;
  req.body.user = req.user.userId;
  const offer = await Offer.findOneAndUpdate({ _id: offerId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!offer) {
    throw new CustomError.NotFoundError(`No offer with id : ${offerId}`);
  }
  res.status(StatusCodes.OK).json({ offer });
};

const deleteOffer = async (req, res) => {
  const { id: offerId } = req.params;
  const offer = await Offer.findOne({ _id: offerId });
  if (!offer) {
    throw new CustomError.NotFoundError(`No offer with id : ${offerId}`);
  }
  await offer.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Offer removed." });
};
const getMyOffers = async (req, res) => {
  const { userId } = req.user;
  const offers = await Offer.find({ user: userId });
  res.status(StatusCodes.OK).json({ nth: offers.length, offers });
};

module.exports = {
  createOffer,
  getAllOffers,
  getSingleOffer,
  updateOffer,
  deleteOffer,
  getMyOffers,
};
