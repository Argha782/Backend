import { asyncHandler } from "../utils/asynchandler.js";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(400).json({
  //     message: "Hello there!!"
  // })

  //  get user details  from frontend
  //  validation not empty
  //  check if user already exists: user, email
  //  check for images, check for avatar
  //  upload them to cloudinary, avatar
  //  create user object - create entry in db
  //  remove pw and refresh token field from response
  //  check for user creation
  //  return res

  const { fullName, username, email, password } = req.body;
  console.log("email :", email);

  // if (fullName === "") {
  //   throw new ApiError(400, "fullname is required");
  // } else if (username === "") {
  //   throw new ApiError(400, "username is required");
  // } else if (email === "") {
  //   throw new ApiError(400, "email is required");
  // } else if (password === "") {
  //   throw new ApiError(400, "password is required");
  // }

    if (
      [fullName, username, email, password].some((field) => field?.trim === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with same email or username already exists");
  }
  console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }
  
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);


  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
