import ImageKit from "@imagekit/nodejs";
import fs from "fs";

const cloudStorage = async () => {
  const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
  });

  try {
    const response = await client.files.upload({
      file: fs.createReadStream("Presentation.pptx"),
      fileName: "Presentation.pptx",
    });

    if (!response || !response.url) {
      return { message: "ImageKit upload failed: No URL returned" };
    }

    return response;
  } catch (error) {
    return { message: "PPT generation failed" };
  }
};

export default cloudStorage;
