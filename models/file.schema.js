import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    fileURL: {
      type: String,
      required: true,
    },

    uuid: {
      type: String,
      required: true,
    },

    sender: String,
    receiver: String,
  },
  {
    timeseries: true,
  }
);

export const FileModel = mongoose.model("file", fileSchema);
