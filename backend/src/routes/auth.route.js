import expres from "express";
import {
  signup,
  logout,
  login,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = expres.Router();

router.post("/signup", signup);
router.put("/update-profile", protectRoute, checkAuth);
router.post("/logout", logout);
router.post("/login", login);

//checks if user is authenticated
router.get("/check", protectRoute, updateProfile);
export default router;
