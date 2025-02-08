import { Router } from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getALLSongs } from "../controller/songController.js";
import { getALLUsers } from "../controller/userController.js";

const router = Router();

router.get("/",protectRoute,getALLUsers);

export default router;