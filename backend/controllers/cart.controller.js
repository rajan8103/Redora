import User from "../models/user.model.js";

export const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { cart } = req.body;
    const updatedCart = await User.findByIdAndUpdate(userId, {
      cartItems: cart,
    });
    res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};
