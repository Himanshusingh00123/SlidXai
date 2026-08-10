import express from "express";
import generatePpt from "../controllers/ppt.controller.js";

const router = express.Router();

router.post("/generate-ppt", generatePpt);

export default router;
