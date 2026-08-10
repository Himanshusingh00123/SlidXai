import fs, { existsSync } from "fs";
import pptCode from "../services/pptCode.service.js";
import { exec } from "child_process";
import { promisify } from "util";
import cloudStorage from "../services/storage.service.js";
import { cwd } from "process";
import path, { dirname } from "path";
import pptModel from "../models/ppt.model.js";

const execPromise = promisify(exec);
const tempDir = path.join(import.meta.dirname, "../temp");
const filePath = path.join(import.meta.dirname, "../temp/presentation.js");
const PptFilePath = path.join(import.meta.dirname, "../../Presentation.pptx");

const generatePpt = async (req, res) => {
  try {
    const { pptDescription } = req.body;

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const code = await pptCode(pptDescription);
    if (typeof code === "object") {
      return res.status(429).json(code);
    }

    // const user = req.user.id;

    fs.writeFileSync(filePath, code, "utf-8");

    await execPromise(` node "${filePath}"`, {
      cwd: path.join(import.meta.dirname, "../../"),
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const pptData = await cloudStorage();

    const userPPT = await pptModel.create({
      userId: "6a756e7a8b1342e00b69acbc",
      title: pptData.name || "Untitled Presentation",
      ppt: pptData.url,
    });

    return res.status(201).json({
      PPT: {
        title: userPPT.title,
        ppt: userPPT.ppt,
      },
      message: "Congratualation, Presentation created successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "PPT generation failed" });
  } finally {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (fs.existsSync(PptFilePath)) {
        fs.unlinkSync(PptFilePath);
      }
    } catch (error) {
      console.log("File cleanup failed", error);
    }
  }
};

export default generatePpt;
