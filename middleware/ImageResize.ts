import sharp from "sharp"
import path from "path"
import fs from "fs"
import { Request, Response, NextFunction } from "express";

const outputFolder = "public/assets";

interface MulterFile {
  path: string;
  filename: string;
}

interface RequestWithFiles extends Request {
  files?: MulterFile[];
  images?: string[];
}

const resize = async (req: Request, res: Response, next: NextFunction) => {
  const images: string[] = [];
  const request = req as RequestWithFiles;

  if (!request.files) return next();

  const resizePromises = request.files.map(async (file) => {
    await sharp(file.path)
      .resize(2000)
      .jpeg({ quality: 50 })
      .toFile(path.resolve(outputFolder, file.filename + "_full.jpg"));

    await sharp(file.path)
      .resize(100)
      .jpeg({ quality: 30 })
      .toFile(path.resolve(outputFolder, file.filename + "_thumb.jpg"));

    fs.unlinkSync(file.path);

    images.push(file.filename);
  });

  await Promise.all([...resizePromises]);

  request.images = images;

  next();
};
export default resize;