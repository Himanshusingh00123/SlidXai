import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
