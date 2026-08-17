import express from "express";
import passport from "passport";
import authLogin from "../controllers/auth.controller.js";
import { getMe, logout } from "../middlewares/auth.middleware.js";

const router = express.Router();

// --------------------------googleOAuth------------------------------

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/`,
  }),
  async (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  },
);

// ------------------------------------githubOAuth-----------------------------------

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${process.env.CLIENT_URL}/`,
  }),
  async (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  },
);

router.get("/get-me", getMe, authLogin);

router.get("/logout", logout);

export default router;
