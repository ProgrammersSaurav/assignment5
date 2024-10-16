import express from "express";
const router = express.Router();
import * as studentController from "../Student_registration/controller/studentController.js";
import authMidleware from "../Student_registration/middleware/authMidleware.js";
import { fileController, upload } from "../Student_registration/controller/fileController.js";
import { uploadFile } from "../Student_registration/service/fileSevice.js";



router.post("/register", studentController.register)
router.post("/login", studentController.login)
router.get("/profileread", authMidleware, studentController.profileRead)
router.post("/profileupdate", authMidleware, studentController.ProfileUpdate)
router.post('/upload', fileController,upload);
router.post('/uploadFile', fileController,uploadFile);

export default router;


