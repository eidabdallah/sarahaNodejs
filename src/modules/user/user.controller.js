import userModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/errorHandling.js";
import { AppResponse, globalSuccessHandler } from "../../utils/responseHandler.js";
import { sendConfirmEmail } from './../auth/authHelpers.js';
import { customAlphabet } from "nanoid";
import { Op } from 'sequelize';

export const getAllUsers = async (req, res, next) => {
    const users = await userModel.findAll({
        where: {
            id: {
                [Op.ne]: req.user.id
            }
        },
        attributes: { exclude: ['password', 'sendCode', 'confirmEmail'] }
    });

    if (users.length > 0) {
        const response = new AppResponse('جميع المستخدمين باستثناء المستخدم الحالي', users, 200, 'users');
        return globalSuccessHandler(response, req, res);
    }

    return next(new AppError('لا يوجد مستخدمين', 404));
}


export const getUserInfromation = async (req, res, next) => {
    const user = await userModel.findByPk(req.user.id, {
        attributes: { exclude: ['password', 'sendCode', 'confirmEmail' , 'createdAt' , 'updatedAt'] }
    });
    if (user) {
        const response = new AppResponse('معلومات المستخدم', user, 200, 'user');
        return globalSuccessHandler(response, req, res);
    }
    return next(new AppError('User not found', 404));
}

export const updateUserInfromation = async (req, res, next) => {
    const { userName, email } = req.body;
    const user = await userModel.findByPk(req.user.id);
    if (!user)
        return next(new AppError('المستخدم غير متوفر', 404));
    if (userName) {
        if (req.user.userName != userName) {
            user.userName = userName;
            const code = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 10)();
            user.urlUser = `saraha/${code}/${userName}`;
        }
    }
    if (email) {
        if (req.user.email != email) {
            const existingUser = await userModel.findOne({ where: { email } });
            if (existingUser)
                return next(new AppError('الايميل موجود بالفعل', 400));
            user.confirmEmail = false;

            await sendConfirmEmail(email, userName || req.user.userName, req);
            user.email = email;
        }
    }
    await user.save();
    const response = new AppResponse('تم التحديث بنجاح', user, 200, 'user');
    return globalSuccessHandler(response, req, res);
}

export const deleteUser = async (req, res, next) => {
    const user = await userModel.findByPk(req.params.id);
    if (!user)
        return next(new AppError('المستخدم غير متوفر', 404));
    await user.destroy();
    const response = new AppResponse('تم الحذف بنجاح', null, 200);
    return globalSuccessHandler(response, req, res);
}

export const changeRole = async (req, res, next) => {
    const { role } = req.body;
    const user = await userModel.findByPk(req.params.id);
    if (!user)
        return next(new AppError('المستخدم غير متوفر', 404));
    user.role = role;
    user.save();
    const response = new AppResponse('تم تغيير المنصب بنجاح', null, 200);
    return globalSuccessHandler(response, req, res);
}
