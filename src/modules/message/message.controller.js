import messageModel from "../../../DB/model/message.model.js"
import userModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/errorHandling.js";
import { AppResponse, globalSuccessHandler } from "../../utils/responseHandler.js";

export const getMessages = async (req, res, next) => {
    const messages = await messageModel.findAll({
        where: { UserId: req.user.id }
    });
    if (messages.length > 0) {
        const response = new AppResponse('Fetch Messages Successfully', messages, 200 , 'messages');
        return globalSuccessHandler(response, req, res);
    }
    return next(new AppError('No messages Found', 404));
}
export const sendMessage = async (req, res, next) => {
    const { contant, UserId } = req.body;
    const user = await userModel.findByPk(UserId);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    const message = await messageModel.create({ UserId, contant });
    const response = new AppResponse('Send Message Successfully', message, 201 , 'messageData');
    return globalSuccessHandler(response, req, res);
}

