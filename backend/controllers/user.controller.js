import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//ragister a new user = signUp
export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Alrady Exists Please try with another one!",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "User register successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
    // user.save();
  } catch (error) {
    console.error("error during SignUp Please try again!", error);
    return res
      .status(500)
      .json({ message: "Internal Server error ", success: false });
  }
};

// login -user
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found ", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials ", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      // secure: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "User Logged in Successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("error during SignIn Please try again!", error);
    return res
      .status(500)
      .json({ message: "Internal Server error ", success: false });
  }
};
//logout user
export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "User Logout Successfully",
      success: false,
    });
  } catch (error) {
    console.error("error during Logout Please try again!", error);
    return res
      .status(500)
      .json({ message: "Internal Server error ", success: false });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "user notfound ", success: false });
    }
    return res.status(200).json({
      success: true,
      user,
      message: "user Authonticate",
    });
  } catch (error) {
    console.error("error during checkAuth", error);
    return res
      .status(500)
      .json({ message: "Internal Server error ", success: false });
  }
};
