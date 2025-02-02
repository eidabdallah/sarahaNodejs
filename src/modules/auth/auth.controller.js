import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { customAlphabet } from "nanoid";
import { confirmEmailMessage, sendCodeToEmail, sendConfirmEmail } from "./authHelpers.js";
import { AppError } from "../../utils/errorHandling.js";
import { AppResponse, globalSuccessHandler } from "../../utils/responseHandler.js";

export const register = async (req, res, next) => {
    const { userName, email, password } = req.body;
    if (await userModel.findOne({ where: { email } }))
        return next(new AppError('البريد الإلكتروني موجود بالفعل مسبقا', 409));

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    await userModel.create({ userName, email, password: hashPassword });
    await sendConfirmEmail(email, userName, req);

    const response = new AppResponse('User registered successfully', null , 201);
    return globalSuccessHandler(response, req, res);
}
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user)
        return next(new AppError('يوجد خطا في الايميل او كلمة السر', 400));
    if (!user.confirmEmail)
        return next(new AppError('الرجاء تاكيد البريد الالكتروني عبر gmail', 403));

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
        return next(new AppError('يوجد خطا في الايميل او كلمة السر', 400));

    const token = jwt.sign({ id: user.id, email, userName:user.userName , role: user.role, confirmEmail: user.confirmEmail }, process.env.JWT_SECRET, { expiresIn: '10h' });
    const response = new AppResponse('Logged in successfully', token, 200, 'token');
    return globalSuccessHandler(response, req, res);
}
export const confirmEmail = async (req, res, next) => {
    const { token } = req.params;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ where: { email: decodedToken.email } });
    if (user) {
        user.confirmEmail = true;
        await user.save();
       await confirmEmailMessage(user.userName , res);
    } else {
        return next(new AppError('User not found', 404));
    }
}

export const sendCode = async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user)
        return next(new AppError('الايميل غير موجود', 404));
    const code = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 6)();
    user.sendCode = code;
    await user.save();
    await sendCodeToEmail(email, code);
    setTimeout(async () => {
        user.sendCode = '';
        await user.save();
    }, 5 * 60 * 1000);
    const response = new AppResponse('Code sent successfully', null, 200);
    return globalSuccessHandler(response, req, res);
}

export const forgetPassword = async (req, res, next) => {
    const { email, password, code } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user)
        return next(new AppError('الايميل غير موجود', 404));
    if (user.sendCode != code)
        return next(new AppError('رمز التاكيد غير صحيح', 403));
    user.password = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    user.sendCode = '';
    await user.save();
    const response = new AppResponse('Password reset successfully', null, 200);
    return globalSuccessHandler(response, req, res);

}

export const changePassword = async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;
    if (req.user.email != email)
        return res.status(403).json({ message: 'The email address provided does not match your account.' });
    const user = await userModel.findOne({ where: { email } });
    if (!user)
        return next(new AppError('Email not found', 404));
    const isMatch = bcrypt.compareSync(oldPassword, user.password);
    if (!isMatch)
        return next(new AppError('Invalid old password', 403));
    user.password = bcrypt.hashSync(newPassword, parseInt(process.env.SALTROUND));
    await user.save();
    const response = new AppResponse('Password changed successfully', null, 200);
    return globalSuccessHandler(response, req, res);
}
