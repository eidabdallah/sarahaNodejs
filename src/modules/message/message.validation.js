import Joi from 'joi';
export const sendMessageSchema = Joi.object({
    contant: Joi.string().min(1).required().messages({
        "string.empty": "المحتوى مطلوب.",
        "string.min": "يجب أن يحتوي المحتوى على حرف واحد على الأقل.",
    }),
    urlUser: Joi.string().required().messages({
        "string.base": "يجب أن يكون رابط المستخدم نصًا.",
        "any.required": "رابط المستخدم مطلوب."
    })
});