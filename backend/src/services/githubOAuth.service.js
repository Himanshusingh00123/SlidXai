import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import userModel from "../models/user.model.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0]?.value;

        let user = await userModel.findOne({
          $or: [{ authId: profile.id }, { email: email }],
        });
        if (!user) {
          user = await userModel.create({
            authId: profile.id,
            name: profile.username,
            email: profile.emails[0]?.value,
            profileImg: profile.photos[0]?.value,
            provider: profile.provider,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null, {
          message:
            "An account with this email address already exists. Please use a different email.",
        });
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});

export default passport;
