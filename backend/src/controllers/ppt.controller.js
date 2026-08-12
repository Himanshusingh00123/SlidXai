import fs, { existsSync } from "fs";
import pptCode from "../services/pptCode.service.js";
import { exec } from "child_process";
import { promisify } from "util";
import cloudStorage from "../services/storage.service.js";
import path, { dirname } from "path";
import pptModel from "../models/ppt.model.js";

export const generatePpt = async (req, res) => {
  const randomNum = Math.floor(159 + Math.random() * 195);
  const execPromise = promisify(exec);
  const tempDir = path.join(import.meta.dirname, "../temp");
  const ScriptfilePath = path.join(
    import.meta.dirname,
    `../temp/presentation_${randomNum}.js`,
  );
  const PptFilePath = path.join(import.meta.dirname, "../../Presentation.pptx");
  const PptUniqueFilePath = path.join(
    import.meta.dirname,
    `../../Presentation_${randomNum}.pptx`,
  );

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

    fs.writeFileSync(ScriptfilePath, code, "utf-8");

    await execPromise(` node "${ScriptfilePath}"`, {
      cwd: path.join(import.meta.dirname, "../../"),
    });

    if (fs.existsSync(PptFilePath)) {
      fs.renameSync(PptFilePath, PptUniqueFilePath);
    }

    if (fs.existsSync(ScriptfilePath)) {
      fs.unlinkSync(ScriptfilePath);
    }

    const pptData = await cloudStorage(PptUniqueFilePath);

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
      if (fs.existsSync(ScriptfilePath)) {
        fs.unlinkSync(ScriptfilePath);
      }
      if (fs.existsSync(PptUniqueFilePath)) {
        fs.unlinkSync(PptUniqueFilePath);
      }
    } catch (error) {
      console.log("File cleanup failed", error);
    }
  }
};

export const fetchAllPpt = async (req, res) => {
  try {
    // const user = req.user.id;

    const PptResponse = await pptModel.find({
      userId: "6a756e7a8b1342e00b69acbc",
    });

    if (!PptResponse || PptResponse.length === 0) {
      return res.status(200).json({
        message: "No PPT yet. Create your first PPT to get started!",
      });
    }

    return res.status(200).json(PptResponse);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to load PPTs. Please try again.",
    });
  }
};

export const deletePpt = async (req, res) => {
  try {
    const PPT_Id = req.params.id;

    if (!PPT_Id) {
      return res.status(404).json({
        message: "PPT Id is required to proceed.",
      });
    }

    const deleteResponse = await pptModel.deleteOne({ _id: PPT_Id });

    if (deleteResponse.deletedCount === 0) {
      return res.status(404).json({
        message: "PPT not found or has already been deleted.",
      });
    }

    return res.status(200).json({
      message: "PPT deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete the PPT. Please try again.",
    });
  }
};
