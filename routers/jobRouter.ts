import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobController";
import {
  validateIdJob,
  validateIdParam,
  validateJobInput,
} from "../middleware/validationMiddleware";
import { checkForTestUser } from "../middleware/authMiddleware";
const router = Router();

router.get("/:id", validateIdParam, getJob);
router.get("/", getAllJobs);
router.post("/", checkForTestUser, validateJobInput, createJob);
router.delete("/:id", checkForTestUser, validateIdJob, deleteJob);
router.patch(
  "/:id",
  checkForTestUser,
  validateJobInput,
  validateIdJob,
  updateJob
);

export default router;
