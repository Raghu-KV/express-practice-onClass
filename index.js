//const express = require("express");
// const MongoClient = require("mongodb.MongoClient");

import express from "express";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import moviesRouter from "./routes/movies.routes.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();
const app = express();
//console.log(process.env.MONGO_URL);

const PORT = process.env.PORT;
//const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log(`Connnected on the port${PORT}`);

// for connection

// const MONGO_URL = "mongodb://127.0.0.1";
// const client = new MongoClient(MONGO_URL); // dail
// await client.connect(); // call
// console.log("Mongo is connected !!!");

// for every post method thids line converts to JSON format

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("working with nodemon");
});
//_________________________________________________________________________________________

app.use("/movies", moviesRouter);
app.use("/user", userRouter);
export { client };

// hashPass

// const generateHashPass = async (userPass) => {
//   const NO_OF_ROUNDS = 10;
//   const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
//   const hashPass = await bcrypt.hash(userPass, salt);
//   console.log(salt);
//   console.log(hashPass);
// };

// generateHashPass("qwerty123");

app.listen(PORT, () => console.log(`server is in the port${PORT}`));
