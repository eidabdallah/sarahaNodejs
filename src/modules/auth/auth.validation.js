import Joi from 'joi';
import { generalFields } from '../../middleware/validation.middleware.js';
export const registerSchema = Joi.object({
    userName: generalFields.userName,
    email: generalFields.email,
    password: generalFields.password,
});

export const loginSchema = Joi.object({
    email: generalFields.email,
    password: generalFields.password,
});

export const sendCodeSchema = Joi.object({
    email: generalFields.email,
});

export const forgetPasswordSchema = Joi.object({
    email: generalFields.email,
    password: generalFields.password,
    code: Joi.string().length(6).required().messages({
        'string.base': 'يجب أن يكون الرمز عبارة عن نص.',
        'string.empty': 'لا يمكن أن يكون الرمز فارغاً.',
        'string.length': 'يجب أن يكون الرمز مكوناً من 6 خانات بالضبط.',
        'any.required': 'الرمز مطلوب.'
    })
});

export const changePasswordSchema = Joi.object({
    email: generalFields.email,
    oldPassword: generalFields.password,
    newPassword: generalFields.password,
});