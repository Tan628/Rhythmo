import{Router} from "express";
import {authCallback} from "../controller/authController.js";
import{User} from "../Model/userModel.js";

const router = Router();


router.post("/callback",authCallback);

export default router;