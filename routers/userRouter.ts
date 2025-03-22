import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/useController";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middleware/authMiddleware";
import upload from "../middleware/multerMiddleware";

const router = Router();
router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getApplicationStats,
]);

router.post("/update-user", checkForTestUser, updateUser);

export default router;
