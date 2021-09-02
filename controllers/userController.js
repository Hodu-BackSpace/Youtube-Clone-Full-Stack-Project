import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password != password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      console.log("here");
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    if (id === "change_password") {
      const user = await User.findById(req.user.id);
      res.render("changePassword", {
        pageTitle: "Change Password",
        user: user,
      });
    }
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user: user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const users = (req, res) => {
  res.render("users", { pageTitle: "Users" });
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.render("userDetail", { pageTitle: "User Detail", user: user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = (req, res) => {
  const {
    body: { name, email },
    file: { path },
  } = req;
  try {
  } catch (error) {
    res.render("editProfile");
  }
};
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const user = await User.findById();
  console.log(user.id);
};