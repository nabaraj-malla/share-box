import e from "express";
import { DownloadController } from "../controllers/download.controller.js";

const donwloadController = new DownloadController();
const downloadRouter = e.Router();

downloadRouter.get("/:uuid", donwloadController.hanldeDownload);

export default downloadRouter;
