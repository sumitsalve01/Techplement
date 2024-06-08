import express from "express";
//import { protectRoute } from "../middleware/protectRoute.js";
import { signup,login,logout, } from "../controller/userController.js";

const router= express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);


export default router;