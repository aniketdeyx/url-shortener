import { create_user } from "../dao/user.js";
import { findUserByEmail, findUserByEmailByPassword } from "../dao/user.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email);
    if (user) {
        throw new Error("User already exists");
    }
    const newUser = await create_user(name, email, password);
    const token = signToken({ id: newUser._id });
    return { token, user: newUser };
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmailByPassword(email);
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = signToken({ id: user._id });
    return { token, user };
}

