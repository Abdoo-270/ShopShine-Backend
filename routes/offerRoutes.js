const express = require("express");
const router = express.Router();
const {
  createOffer,
  getAllOffers,
  getSingleOffer,
  updateOffer,
  deleteOffer,
  getMyOffers,
} = require("../controllers/offerController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.route("/").get(getAllOffers).post(authenticateUser, createOffer);
router.route("/myOffers").get(authenticateUser, getMyOffers);

router
  .route("/:id")
  .get(getSingleOffer)
  .patch(authenticateUser, updateOffer)
  .delete(authenticateUser, deleteOffer);

module.exports = router;
