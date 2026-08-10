import mongoose from "mongoose";

const pptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },

  title: {
    type: String,
    required: true,
  },

  ppt: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

pptSchema.index({
  createdAt: -1,
});

const pptModel = mongoose.model("userPpt", pptSchema);

export default pptModel;
