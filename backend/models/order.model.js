import mongoose from "mongoose";

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "User" }, // Kis user ne order kiya

    items: [
      // Order me kya items hain
      {
        product: { type: String, required: true, ref: "Book" }, // Product (Book ka reference)
        quantity: { type: Number, required: true }, // Quantity
      },
    ],

    amount: { type: Number, required: true }, // Total amount
    address: { type: String, required: true, ref: "Address" }, // Delivery address
    status: { type: String, default: "Order Placed" }, // Order status (default "Order Placed")
    paymentType: { type: String, required: true }, // Payment method (COD, UPI, Card etc.)
    isPaid: { type: Boolean, required: true, default: false }, // Payment status
  },
  { timestamps: true } // CreatedAt & UpdatedAt fields automatically add karega
);

// Model create
const Order = mongoose.model("Order", orderSchema);

export default Order;
