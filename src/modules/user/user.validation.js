import Joi from 'joi';
import { generalFields } from '../../middleware/validation.middleware.js';
export const updateUserSchema = Joi.object({
    userName: generalFields.userName.optional(),
    email: generalFields.email.optional(),
});

export const changeRoleSchema = Joi.object({
    role: Joi.string().valid('admin', 'user').required().messages({
        'any.only': 'Role must be either (admin or user)',
        'any.required': 'Role is required.'
    })
});

export const deleteUserSchema = Joi.object({
    id: Joi.number().min(1).required().messages({
        'number.base': 'يجب أن يكون المعرف عددا.',
        'number.min': 'يجب أن يكون المعرف عددا أكبر من 0.',
        'any.required': 'المعرف مطلوب.'
    })
});
