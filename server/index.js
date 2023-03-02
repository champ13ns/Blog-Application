import express from "express";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);
const PORT = 8000

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.listen(PORT, () => {
  console.log("server is up and running on port !", PORT);
});

Connection(username, password);
