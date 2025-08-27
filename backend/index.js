import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import bookRouter from "./routes/book.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import addressRouter from "./routes/address.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
//middlewares
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());
// connect database
connectDB();
//api endPoints//
app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server!");
});
//routes
app.use("/images", express.static("uploads"));
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/book", bookRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/address", addressRouter);
app.listen(PORT, () => {
  console.log(`server is running onhttp://localhost:${PORT}`);
});
