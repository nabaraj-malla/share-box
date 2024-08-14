import { FileModel } from "../models/file.schema.js";

export class ShowController {
  async handleShow(req, res) {
    try {
      const uuid = req.params.uuid;
      console.log("uuid", uuid);
      const file = await FileModel.findOne({ uuid });
      console.log("file", file);
      if (!file) {
        return res.render("download", { error: "Link had been expired" });
      }

      return res.render("download", {
        uuid: uuid,
        fileName: file.name,
        downloadLink: `${process.env.APP_BASE_URL}files/download/${uuid}`,
        // downloadLink: `/files/download/${uuid}`,
      });
    } catch (error) {
      console.log(error);
      return res.render("download", { error: "Something went wrong" });
    }
  }
}
