import { Router } from "express";
import * as messageController from "./message.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { validation } from "../../middleware/validation.middleware.js";
import { endPoints } from "./message.role.js";
import { sendMessageSchema } from "./message.validation.js";
const router = Router();

router.get('/', asyncHandler(auth(endPoints.getMessages)), asyncHandler(messageController.getMessages));
router.post('/', asyncHandler(auth(endPoints.sendMessage)), validation(sendMessageSchema), asyncHandler(messageController.sendMessage));



export default router;
