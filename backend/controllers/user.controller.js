import { Readings } from "../models/readings.model.js";
import { User } from "../models/user.model.js";
import { ApiError, handleErr } from "../util/ApiError.js";
import { ApiResponse, basicStart } from "../util/ApiResponse.js";
import bcrypt from "bcryptjs";

const generateAccessAndRefreshToken = async (userId, res) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  }
  catch (err) {
    console.log(err);
    // return res.json(new ApiError(400, "Error generating token! ", err));
  }
};


const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json(new ApiResponse(410, "All fields are required!"));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json(new ApiResponse(409, "User already exists!"));
    }
    const newUser = await User.create({
      username,
      email,
      password
    });

    await newUser.save()

    return res.json(
      new ApiResponse(201, newUser, "User registered successfully!")
    );

  }
  catch (err) {
    return handleErr(res, err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ username: email }) || await User.findOne({ email: email });;

    if (!user) return res.json(new ApiResponse(404, "user not found", "invalid credentials"));

    const password_check = await bcrypt.compare(password, user.password);

    if (!password_check) return res.json(new ApiResponse(401, "invalid credentials"));

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));

  }
  catch (err) {
    return handleErr(res, err);
  }
}

const fetchReadings = async (req, res) => {
  try {

    const { userID } = req.body;
    const user = await User.findById(userID).populate("readings")

    if (!user) return res.json(new ApiResponse(404, "User not found."));

    return res.json(new ApiResponse(200, user.readings, "Readings fetched successfully!"));

  }
  catch (err) {
    return handleErr(res, err);
  }
}

const fetchReadingsById = async (req, res) => {
  try {
    const { readingID } = req.body;
    


    if (!readingID) return res.json(new ApiResponse(404 , `Id required`));

    const data = await Readings.findById(id);
    if(!data) return res.json(new ApiResponse(404 , 'Not Found'))
    
    if (data.userID) {
      return res.json(new ApiResponse(200, data))
    }

  }
  catch (err) {
    return handleErr(res, err);
  }
}

const fetchUser = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await User.findById(userID).select("-refreshToken -password");

    if (!user) return res.json(new ApiResponse(404, "User not found."));

    return res.json(new ApiResponse(200, user));

  }
  catch (err) {
    return handleErr(res, err);
  }
}

export {
  registerUser,
  login,
  fetchReadings,
  fetchReadingsById,
  fetchUser
};
