import { GridFsStorage } from "multer-gridfs-storage";
import dotevn from "dotenv";
import multer from "multer";
// import Connection from "../database/db";

dotevn.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// console.log(file); 

const storage = new GridFsStorage({
   url :  `mongodb://fuloria:${password}@ac-oxpt37s-shard-00-00.aadendv.mongodb.net:27017,ac-oxpt37s-shard-00-01.aadendv.mongodb.net:27017,ac-oxpt37s-shard-00-02.aadendv.mongodb.net:27017/?ssl=true&replicaSet=atlas-jqqssb-shard-0&authSource=admin&retryWrites=true&w=majority`,
  options: { useNewUrlParser: true },
  file: (req, file) => {
    console.log("file from aggs is ",file)
    const match = ["image/png", "image/jpg"];
    if (match.indexOf(file.memeType) === -1) {
      console.log("yesssslasjdfljsaldtye")
      return `${Date.now()}-blog-${file.originalname}`;
    }
    return {
      bucketName: "photos",
      fileName: `${Date.now()}-blog-${file.originalname}`, 
    };
  },
});


export default multer({ storage });
