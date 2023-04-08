import express from "express";
import {
  loginUser,
  createUser,
  sendLink,
  verifyUser,
  makeNewPassword,
  getAccessToken,
  handleSubmitUserImage,
} from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";

// start our express router
const authRouter = express.Router();

// register user
authRouter.post("/create", createUser);
// login user
authRouter.post("/login", loginUser);
// send reset password link to user
authRouter.post("/sendLink", sendLink);
// checks for user in database
authRouter.get("/verifyUser/:id", verifyToken, verifyUser);
// reset password
authRouter.post("/changePassword/:id", verifyToken, makeNewPassword);
// verify token  and create refresh token
authRouter.post("/token", getAccessToken);
// user upload profile photo
authRouter.post("/profileImage", handleSubmitUserImage);

export default authRouter;
