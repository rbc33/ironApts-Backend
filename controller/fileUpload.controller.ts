import cloudinary from "../utils/cloudinaryConfig"
import fs from "fs"
import { NextFunction, Request, Response } from "express";


const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
     // Check if the file was provided
    if(!req.file) {
      return res.status(400).json({message: 'No file uploaded'});
    }

    console.log('Uploading to Cloudinary...');
    // Upload file to Cloudinary
    const cloudinaryUploadResponse = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto"
    });
   
    console.log("Your file is uploaded on Cloudinary ", cloudinaryUploadResponse.url);
   
    } catch (error) {
      console.error(error);
      if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
    }
};
console.log(uploadFile, "uploadfile");

export { uploadFile };