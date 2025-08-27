import express from "express";
import {
  checkAuth,
  LoginUser,
  LogoutUser,
  SignUp,
} from "../controllers/user.controller.js ";
import { authUser } from "../middlewares/authUser.js";

const userRouter = express.Router();
userRouter.post("/signup", SignUp);
userRouter.post("/login", LoginUser);
userRouter.get("/is-auth", authUser, checkAuth);
userRouter.get("/logout", authUser, LogoutUser);
export default userRouter;
