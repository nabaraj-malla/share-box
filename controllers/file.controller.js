import { FileModel } from "../models/file.schema.js";
import { sendMailFunc } from "../services/email.service.js";
import { templateFun } from "../services/email-template.service.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();
export class FileController {
  async addFile(req, res) {
    try {
      const { filename } = req.file;
      const fileURL = req.file.path;
      console.log("fileURL", fileURL);
      const newFile = new FileModel({
        name: filename,
        uuid: uuidv4(),
        fileURL,
      });

      await newFile.save();
      //   return res.redirect(`/files/${newFile.uuid}`);

      // ============   original below one ==============

      return res.json({
        sucess: true,
        file: `${process.env.APP_BASE_URL}files/${newFile.uuid}`,
      });

      //   `${process.env.APP_BASE_URL}/files/${newFile.uuid}`, link to download page
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "File not received" });
    }
  }

  async handleMail(req, res) {
    const { uuid, emailTo, emailFrom } = req.body;
    console.log(req.body);
    if (!uuid || !emailTo || !emailFrom) {
      return res.status(422).send({ error: "All fields are required" });
    }

    // get data from database
    const file = await FileModel.findOne({ uuid });
    // if (file.sender) {
    //   return res.status(422).send({ error: "File already sent" });
    // }

    file.sender = emailFrom;
    file.receiver = emailTo;
    const result = await file.save();
    const dataObject = {
      from: emailFrom,
      to: emailTo,
      subject: "Easy file share",
      text: `${emailFrom} sent mail`,
      html: templateFun({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}files/download/${uuid}`,
        // downloadLink: `/files/download/${uuid}`,
        size: 100,
        expires: "24 hrs",
      }),
    };
    sendMailFunc(dataObject);
    res.send("mail operation done");
  }
}
