import { roles } from "../../middleware/auth.middleware.js";

export const endPoints = {
    getAllUsers: [roles.ADMIN],
    getUserById: [roles.USER, roles.ADMIN],
    updateInfo: [roles.USER, roles.ADMIN],
    deleteUser: [roles.ADMIN],
    changeRole: [roles.ADMIN],
    searchUsers: [roles.USER, roles.ADMIN],
}
