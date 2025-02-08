import { Router } from "express";
import { getALLSongs,getFeaturedSongs,getMadeForYouSongs,getTrendingSongs } from "../controller/songController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
// import { getMadeForYouSongs } from "../controller/songController.js";

const router = Router();   

router.get("/",protectRoute,requireAdmin, getALLSongs);
router.get("/Featured",getFeaturedSongs);
router.get("/made-for-you",getMadeForYouSongs);
router.get("/trending", getTrendingSongs);


export default router;