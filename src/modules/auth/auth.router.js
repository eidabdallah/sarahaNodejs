import { Router } from "express";
import * as authController from "./auth.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { changePasswordSchema, forgetPasswordSchema, loginSchema, registerSchema, sendCodeSchema } from "./auth.validation.js";
import { validation } from "../../middleware/validation.middleware.js";
import { endPoints } from "./auth.role.js";
const router = Router();

router.post('/register', validation(registerSchema), asyncHandler(authController.register));
router.post('/login', validation(loginSchema), asyncHandler(authController.login));
router.get('/confirmEmail/:token', asyncHandler(authController.confirmEmail));
router.patch('/sendCode', validation(sendCodeSchema), asyncHandler(authController.sendCode));
router.patch('/forgetPassword', validation(forgetPasswordSchema), asyncHandler(authController.forgetPassword));
router.patch('/changePassword', auth(endPoints.changePassword), validation(changePasswordSchema), asyncHandler(authController.changePassword));

export default router;