import { asyncHandler } from "../utils/asynchandler.js";

const registerUser = asyncHandler(async (req, res)=>{
    res.status(400).json({
        message: "Hello there!!"
    })
})

export {registerUser}
