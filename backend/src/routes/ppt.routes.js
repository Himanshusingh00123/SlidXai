import express from "express";
import {
  generatePpt,
  fetchAllPpt,
  deletePpt,
} from "../controllers/ppt.controller.js";

const router = express.Router();

router.post("/generate-ppt", generatePpt);

router.get("/fetchAll-ppt", fetchAllPpt);

router.delete("/delete-ppt/:id", deletePpt);

export default router;
