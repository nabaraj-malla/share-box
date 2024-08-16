import { FileModel } from "./models/file.schema.js";
import fs from "fs";
import connectToMongo from "./config/connectDB.js";

connectToMongo()
  .then(() => {
    console.log("connection done");
  })
  .catch(() => {
    console.log("error in script database connection");
  });

async function deleteData() {
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await FileModel.find({ createdAt: { $lt: pastDate } });

  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.fileURL); // removes file from our uploads/images' files
        await file.remove();
        console.log(`successfully deleted ${file.name}`);
      } catch (error) {
        console.log(error);
      }
    }
    console.log("done");
  }
}

deleteData().then(process.exit);

export default deleteData;
