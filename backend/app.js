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
import path from "path";

const app = express();

const __dirname = path.resolve();


if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config({path: "./.env"});
app.use(cookieParser());
app.use(attachUser)

app.use("/api/create", short_url);
app.use("/api/auth",auth_routes)
app.use("/api/user", user_routes)
app.get("/s/:id", redirectFromShortUrl)


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    }
    );
}

app.listen(process.env.PORT, () => {
    connectDB();

  console.log("Server is running on port 3000");
});
