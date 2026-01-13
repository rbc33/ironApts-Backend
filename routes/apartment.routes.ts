import multer from "multer";
import {Router} from "express";
import Apartment from "../models/Apartment.model"
import resize from "../middleware/ImageResize";

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const router = Router();

router.post("/", upload.array("images", 5), resize, async (req, res) => {
    
})

