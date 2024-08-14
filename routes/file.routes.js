import e from "express";
import { upload } from "../middlewares/fileUpload.middleware.js";
import { FileController } from "../controllers/file.controller.js";

const fileController = new FileController();

const fileRouter = e.Router();
fileRouter.post("/", upload.single("myFile"), fileController.addFile);
fileRouter.post("/send", fileController.handleMail);

export default fileRouter;
