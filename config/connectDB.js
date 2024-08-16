import mongoose from "mongoose";

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("server connected to mongodb file sharing");
  } catch (error) {
    console.log(error);
    console.log("error in connecting to mongodb");
  }
}

export default connectToMongo;
