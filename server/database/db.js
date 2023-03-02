import mongoose from "mongoose";

const Connection = async (username, password) => {
  mongoose.set("strictQuery", false);
  // const URL = `mongodb+srv://${username}:${password}@cluster0.aadendv.mongodb.net/?retryWrites=true&w=majority`;
  const URL = `mongodb://fuloria:${password}@ac-oxpt37s-shard-00-00.aadendv.mongodb.net:27017,ac-oxpt37s-shard-00-01.aadendv.mongodb.net:27017,ac-oxpt37s-shard-00-02.aadendv.mongodb.net:27017/?ssl=true&replicaSet=atlas-jqqssb-shard-0&authSource=admin&retryWrites=true&w=majority`
  try {
     mongoose.connect(URL, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("db connected successfully");
  } catch (error) {
    console.log("error while connection with db ", error);
  }
};

export default Connection;
