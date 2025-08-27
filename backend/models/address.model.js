import mongoose from "mongoose";

// Address Schema
const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User ka unique ID
  fullName: { type: String, required: true }, // Full Name
  email: { type: String, required: true }, // Email Address
  street: { type: String, required: true }, // Street Address
  city: { type: String, required: true }, // City
  state: { type: String, required: true }, // State
  postalCode: { type: Number, required: true }, // Postal Code (ZIP code)
  country: { type: String, required: true }, // Country
  phoneNumber: { type: String, required: true }, // Phone Number
});

// Model Create
const Address = mongoose.model("Address", addressSchema);

export default Address;
