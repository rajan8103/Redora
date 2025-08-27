import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid Order Detail", success: false });
    }

    //calculate total amounts
    let amount = 0;
    for (const item of items) {
      const book = await Book.findById(item.product);
      if (!book) {
        return res
          .status(404)
          .json({ message: "Book Not Found", success: false });
      }
      amount += book.offerPrice * item.quantity;
    }
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });
    res
      .status(201)
      .json({ message: "Order placed successfully", success: true });
  } catch (error) {
    console.error("order Placement error", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }],
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }],
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
};
