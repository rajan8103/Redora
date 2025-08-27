import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized access", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.log("error in authuser middleware", error);
    return res
      .status(500)
      .json({ message: "Internal server error ", success: false });
  }
};
