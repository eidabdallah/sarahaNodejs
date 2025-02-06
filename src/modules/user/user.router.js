import { Router } from "express";
import * as userController from "./user.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { validation } from "../../middleware/validation.middleware.js";
import { endPoints } from "./user.role.js";
import { changeRoleSchema, deleteUserSchema, updateUserSchema } from "./user.validation.js";
const router = Router();

router.get('/', asyncHandler(auth(endPoints.getAllUsers)), asyncHandler(userController.getAllUsers));
router.get('/userData', asyncHandler(auth(endPoints.getUserById)), asyncHandler(userController.getUserInfromation));
router.patch('/', asyncHandler(auth(endPoints.updateInfo)), validation(updateUserSchema), asyncHandler(userController.updateUserInfromation));
router.delete('/:id', asyncHandler(auth(endPoints.deleteUser)), validation(deleteUserSchema), asyncHandler(userController.deleteUser));
router.patch('/changeRole/:id', asyncHandler(auth(endPoints.changeRole)), validation(changeRoleSchema), asyncHandler(userController.changeRole));

export default router;
