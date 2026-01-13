import express from "express"
import upload from "../middleware/multerSetup"
import { Router } from "express"
import { uploadFile } from "../controller/fileUpload.controller"

const router = Router();

//File upload route
router.post("/upload", upload.single("file"), uploadFile);

export default router;