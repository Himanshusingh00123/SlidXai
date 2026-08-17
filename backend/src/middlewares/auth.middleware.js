import googleOAuth from "../services/googleOAuth.service.js";
import githubOAuth from "../services/githubOAuth.service.js";

export const getMe = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }

    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = (req, res, next) => {
  try {
    req.logout((error) => {
      if (error) return next(error);

      req.session.destroy((error) => {
        if (error) return next(error);

        res.clearCookie("connect.sid");

        return res.status(200).json({
          message: "Logout successful",
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
