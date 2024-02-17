const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const checkPermissions = require("../utils/checkPermissions");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};
const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new customError.BadRequestError("please add items to the card");
  }
  if (!tax || !shippingFee) {
    throw new customError.BadRequestError(
      "please provide tax and shipping fee"
    );
  }
  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({
      _id: item.product,
    });
    if (!dbProduct) {
      throw new customError.BadRequestError(
        `couldn't find product with this id ${item.product}`
      );
    }
    const { title, price, image, _id: productId } = dbProduct;

    const SingleOrderItem = {
      product: productId,
      title,
      price,
      image,
      amount: item.amount,
    };
    // add SingleOrderItem to orderItems[]
    orderItems = [...orderItems, SingleOrderItem];
    // calculating subtotal
    subtotal += item.amount * price;
  }
  // calculate total
  const total = tax + shippingFee + subtotal;
  //get client secret

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({
    _id: orderId,
  });
  if (!order) {
    throw new customError.NotFoundError(
      `couldn't find product with this id ${orderId}`
    );
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({
    user: req.user.userId,
  });
  res.status(StatusCodes.OK).json({ nth: orders.length, orders });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
};
