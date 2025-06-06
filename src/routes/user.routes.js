import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controlllers.js";    
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:2
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

//  secure routes

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refreshtoken").post(refreshAccessToken)

export default router