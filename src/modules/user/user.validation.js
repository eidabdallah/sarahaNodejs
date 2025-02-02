import Joi from 'joi';
import { generalFields } from '../../middleware/validation.middleware.js';
export const updateUserSchema = {
    body: Joi.object({
        userName: generalFields.userName,
        email: generalFields.email.optional(),
    }),
};

export const changeRole = {
    body: Joi.object({
        role: Joi.string().valid('admin', 'user').required().messages({
            'any.only': 'Role must be either (admin or user)',
            'any.required': 'Role is required.'
        })
    })
};
