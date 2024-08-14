import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./config/connectDB.js";
import fileRouter from "./routes/file.routes.js";
import showRouter from "./routes/show.routes.js";
import downloadRouter from "./routes/download.routes.js";

const app = express();
dotenv.config();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("addFile");
});
app.use("api/files", fileRouter);
app.use("files", showRouter); // displays download page
app.use("files/download", downloadRouter);
app.use(express.static("./public"));

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`server is running at port no.${PORT}`);
  connectToMongo();
});
