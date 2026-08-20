import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import pptRoutes from "./routes/ppt.routes.js";

const app = express();
app.set("trust proxy", 1); // Enable proxy trust for production deployments

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running",
  });
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/ppt", pptRoutes);

export default app;
