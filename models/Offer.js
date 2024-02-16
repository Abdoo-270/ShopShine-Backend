const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
  {
    leavingDate: {
      type: String,
      required: true,
      default: () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    departureCity: {
      type: String,
      required: true,
      default: "Unknown City",
    },
    arrivalCity: {
      type: String,
      required: true,
      default: "Unknown City",
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    costPerKilo: {
      type: Number,
      required: true,
      default: 0,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
    },
    userPhoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Offer", OfferSchema);

/*!SECTION
departureTime: {
      type: String,
      default: "00:00",
    },
    arrivalTime: {
      type: String,
      default: "00:00",
    },
    departureAirport: {
      type: String,
      default: "",
    },
    arrivalAirport: {
      type: String,
      default: "",
    },
    deliveryLocation: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    }
*/
