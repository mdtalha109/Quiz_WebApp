import userService from "../services/userService.js";

const loginUser = async (req, res) => {
    return await userService.loginUser(req, res)
}

const registerUser = async (req, res) => {
    return await userService.registerUser(req, res)
}


export const userController = {
    loginUser,
    registerUser
};