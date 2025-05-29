import { registerUser, loginUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";

export const register_user = async (req, res) => {
    const { name, email, password } = req.body;
    const { token, user } = await registerUser(name, email, password)
    req.user = user;
    res.cookie("accesToken", token, cookieOptions);
    res.status(200).json({ message: "register success" })

}

export const login_user = async (req, res) => {
    const { email, password } = req.body
    const { token, user } = await loginUser(email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({ user: user, message: "login success" })
}

export const get_current_user = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    res.status(200).json({ user: req.user })
}