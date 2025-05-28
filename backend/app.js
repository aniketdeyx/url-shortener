import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongoose.config.js";
import short_url from "./src/routes/short_url.route.js";
import auth_routes from "./src/routes/auth.route.js";
import user_routes from "./src/routes/user.routes.js"
import { redirectFromShortUrl } from "./src/controllers/short_url.controller.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // your React app
    credentials: true // 👈 this allows cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config('./.env');
app.use(cookieParser());
app.use(attachUser)

app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl)
app.use("/auth",auth_routes)
app.use("/user", user_routes)

app.listen(3000, () => {
    connectDB();

  console.log("Server is running on port 3000");
});
