import expres from "express";
import { searcUsers } from "../controllers/user.controller.js";
const router = expres.Router();
router.post("/search", searcUsers);
export default router;
