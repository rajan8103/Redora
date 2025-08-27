import express from "express";
import {
  adminLogin,
  adminLogout,
  checkAuth,
} from "../controllers/admin.controller.js";
import { authAdmin } from "../middlewares/authAdmin.js";
const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/is-auth", authAdmin, checkAuth);
adminRouter.get("/logout", authAdmin, adminLogout);
export default adminRouter;
