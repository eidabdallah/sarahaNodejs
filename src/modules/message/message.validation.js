import Joi from 'joi';
export const sendMessageSchema = {
    body: Joi.object({
        contant: Joi.string().min(1).max(500).required().messages({
            "string.empty": "contant is required.",
            "string.min": "contant should have at least 1 character.",
            "string.max": "contant should have at most 500 characters."
        }),
        UserId: Joi.number().integer().required().messages({
            "number.base": "UserId must be a number.",
            "any.required": "UserId is required."
        })
    }),
};