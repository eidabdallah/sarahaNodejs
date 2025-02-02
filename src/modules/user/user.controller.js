import { Op } from "sequelize";
import userModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/errorHandling.js";
import { AppResponse, globalSuccessHandler } from "../../utils/responseHandler.js";
import { sendConfirmEmail } from './../auth/authHelpers.js';
export const getAllUsers = async (req, res, next) => {
    const users = await userModel.findAll();
    if (users.length > 0) {
        const response = new AppResponse('User registered successfully', users, 200, 'users');
        return globalSuccessHandler(response, req, res);
    }
    return next(new AppError('Users not found', 404));
}

export const getUserInfromation = async (req, res, next) => {
    const user = await userModel.findByPk(req.user.id);
    if (user) {
        const response = new AppResponse('get User information successfully', { user }, 200);
        return globalSuccessHandler(response, req, res);
    }
    return next(new AppError('User not found', 404));
}

export const updateUserInfromation = async (req, res, next) => {
    const { userName, email } = req.body;
    const user = await userModel.findByPk(req.user.id);
    if (!user)
        return next(new AppError('User not found', 404));
    if (userName)
        user.userName = userName;
    if (email) {
        if (req.user.email == email)
            return next(new AppError('This is the same as your current email', 400));
        const existingUser = await userModel.findOne({ where: { email } });
        if (existingUser)
            return next(new AppError('Email already exists', 400));
        user.confirmEmail = false;
        await sendConfirmEmail(email, userName || req.user.userName, req);
        user.email = email;
    }
    await user.save();
    const response = new AppResponse('User updated successfully', { user }, 200);
    return globalSuccessHandler(response, req, res);
}

export const deleteUser = async (req, res, next) => {
    const user = await userModel.findByPk(req.params.id);
    if (!user)
        return next(new AppError('User not found', 404));
    await user.destroy();
    const response = new AppResponse('User deleted successfully', null, 200);
    return globalSuccessHandler(response, req, res);
}

export const changeRole = async (req, res, next) => {
    const { role } = req.body;
    const user = await userModel.findByPk(req.params.id);
    if (!user)
        return next(new AppError('User not found', 404));
    user.role = role;
    user.save();
    const response = new AppResponse('User role updated successfully', null, 200);
    return globalSuccessHandler(response, req, res);
}

export const searchUsers = async (req, res, next) => {
    const { userName } = req.query;
    if (!userName) return next(new AppError('Name query parameter is required', 400));
    const users = await userModel.findAll({
        attributes: ['id', 'userName'],
        where: {
            userName: { [Op.like]: `%${userName}%` }
        }
    });
    if (users.length === 0) return next(new AppError('No users found', 404));
    const response = new AppResponse('Users retrieved successfully', users, 200, 'users');
    return globalSuccessHandler(response, req, res);
};
