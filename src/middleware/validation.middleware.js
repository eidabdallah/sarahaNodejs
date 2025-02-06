import Joi from "joi";
import { AppError } from "../utils/errorHandling.js";
export const generalFields = {
    email: Joi.string().email().required().messages({
        "string.empty": "البريد الإلكتروني مطلوب.",
        "any.required": "البريد الإلكتروني مطلوب.",
        "string.email": "يرجى تقديم بريد إلكتروني صالح.",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "كلمة المرور مطلوبة.",
        "any.required": "كلمة المرور مطلوبة.",
        "string.min": "يجب أن تكون كلمة المرور 8 خانات على الأقل.",
    }),
    userName: Joi.string().pattern(/^[a-zA-Zء-ي ]+$/).required().min(3).max(20).messages({
        "string.empty": "اسم المستخدم مطلوب.",
        "any.required": "اسم المستخدم مطلوب.",
        "string.min": "اسم المستخدم يجب أن يكون 3 أحرف على الأقل.",
        "string.max": "اسم المستخدم يجب أن يكون 20 حرفًا كحد أقصى.",
        "string.pattern.base": "اسم المستخدم يجب أن يحتوي على أحرف أبجدية فقط ومسافات.",
    }),
};
export const validation = (schema) => {
    return (req, res, next) => {
        const inputData = { ...req.params, ...req.body };
        const validationResult = schema.validate(inputData, { abortEarly: false });

        if (validationResult?.error) {
            const errors = {};
            validationResult.error.details.forEach((detail) => {
                errors[detail.path[0]] = detail.message;
            });

            return next(new AppError(errors, 400));
        }

        next();
    };
};
