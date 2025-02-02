import { roles } from "../../middleware/auth.middleware.js";

export const endPoints = {
    getMessages: [roles.USER, roles.ADMIN],
    sendMessage: [roles.USER, roles.ADMIN],
}
