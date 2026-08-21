import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0]?.value;

        let user = await userModel.findOne({
          $or: [
            {
              authId: profile.id,
            },
            {
              email: email,
            },
          ],
        });

        if (!user) {
          user = await userModel.create({
            authId: profile.id,
            name: profile.displayName,
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
  return done(null, user._id);
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
