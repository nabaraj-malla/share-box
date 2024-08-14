import e from "express";
import { ShowController } from "../controllers/show.controller.js";
const showController = new ShowController();

const showRouter = e.Router();

showRouter.get("/:uuid", showController.handleShow);

export default showRouter;
