import { FileModel } from "../models/file.schema.js";

export class DownloadController {
  async hanldeDownload(req, res) {
    try {
      const uuid = req.params.uuid;
      const file = await FileModel.findOne({ uuid });
      if (!file) {
        return res.render("download", {
          error: "Link has been expired",
        });
      }

      const filePath = file.fileURL;
      console.log("filePath", filePath);
      res.download(filePath);
    } catch (error) {
      console.log(error);
    }
  }
}
