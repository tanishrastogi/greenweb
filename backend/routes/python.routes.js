import {Router} from "express"
import { pythonScript } from "../controllers/python.controller.js";


const router = Router();


router.route("/pyScript").post(pythonScript)

export default router;