import Joi from 'joi';
import { generalFields } from '../../middleware/validation.middleware.js';
export const updateUserSchema = Joi.object({
    userName: generalFields.userName.optional(),
    email: generalFields.email.optional(),
});

export const changeRoleSchema = Joi.object({
    role: Joi.string().valid('admin', 'user').required().messages({
        'any.only': 'المنصب ان يكون admin او user',
        'any.required': 'المنصب مطلوب.'
    }),
    id: Joi.number().min(1).required().messages({
        'number.base': 'يجب أن يكون المعرف عددا.',
        'number.min': 'يجب أن يكون المعرف عددا أكبر من 0.',
        'any.required': 'المعرف مطلوب.'
    })
});

export const deleteUserSchema = Joi.object({
    id: Joi.number().min(1).required().messages({
        'number.base': 'يجب أن يكون المعرف عددا.',
        'number.min': 'يجب أن يكون المعرف عددا أكبر من 0.',
        'any.required': 'المعرف مطلوب.'
    })
});
