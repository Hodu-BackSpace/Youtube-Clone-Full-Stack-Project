import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const UserScheme = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});

UserScheme.plugin(passport, { usernameField: "email" });

const model = mongoose.model("User", UserScheme);

export default model;
