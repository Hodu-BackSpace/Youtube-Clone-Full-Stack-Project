import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  getEditProfile,
  changePassword,
  postChangePassword,
  postEditProfile,
} from "../controllers/userController";

import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.changePassword, changePassword);
userRouter.post(routes.changePassword, postChangePassword);

export default userRouter;
