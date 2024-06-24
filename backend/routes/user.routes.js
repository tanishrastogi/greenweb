import { Router } from "express"
import { pythonScript } from "../controllers/python.controller.js";
import {
  fetchReadings,
  fetchReadingsById,
  fetchUser,
  login,
  registerUser
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/fetch/readings/all").post(fetchReadings);
router.route("/fetch/readings/id").post(fetchReadingsById);
router.route("/fetch/user").post(fetchUser);

export default router;