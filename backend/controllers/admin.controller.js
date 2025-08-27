import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All feild are required",
        success: false,
      });
    }
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const adminToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.cookie("adminToken", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({
        message: "Login successfully",
        success: true,
      });
    }
  } catch (error) {
    console.error("error during SignIn Please try again!", error);
    return res
      .status(500)
      .json({ message: "Internal Server error ", success: false });
  }
};
// check admin auth  :/admin/is-auth
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("error during admin is auth", error);
    return res
      .status(500)
      .json({ message: "Internal Server error ", success: false });
  }
};
/// logout admin :/admin/logout
export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken");
    res
      .status(200)
      .json({ message: "Admin Logged out successfully", success: true });
  } catch (error) {
    console.error("error during admin logout", error);
    return res
      .status(500)
      .json({ message: "Internal Server error ", success: false });
  }
};
