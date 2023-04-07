import express from "express";
import {
  getUsers,
  userGetById,
  userAddFavorites,
  changeUserInfo,
  getUserByQuery,
  deleteUser,
  sendEmail,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = express.Router();
// get all users
userRouter.get("/", getUsers);
// get user by id
userRouter.post("/me", verifyToken, userGetById);
// change user credentials
userRouter.post("/change/info", changeUserInfo);
// add favored reviews to user favorite bucket
userRouter.post("/me/like/", userAddFavorites);
// get user by query
userRouter.get("/query", getUserByQuery);
// delete user
userRouter.delete("/query", deleteUser);
// receive email from client
userRouter.post("/send-email", sendEmail);

export default userRouter;
