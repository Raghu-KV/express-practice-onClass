//const express = require("express");
// const MongoClient = require("mongodb.MongoClient");

import express from "express";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();
const app = express();
console.log(process.env.MONGO_URL);

const PORT = process.env.PORT;
//const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("connected");

// for connection

// const MONGO_URL = "mongodb://127.0.0.1";
// const client = new MongoClient(MONGO_URL); // dail
// await client.connect(); // call
// console.log("Mongo is connected !!!");

// for every post method thids line converts to JSON format

app.use(express.json());

app.get("/", (req, res) => {
  res.send("working with nodemon");
});
//_________________________________________________________________________________________

app.get("/movies", async (req, res) => {
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }

  const particular = await client
    .db("b40wd")
    .collection("movies")
    .find(req.query)
    .toArray();

  res.send(particular);
});

app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  //const particular = movies.find((movie) => movie.id == id);
  const particular = await client
    .db("b40wd")
    .collection("movies")
    .findOne({ id: id });
  particular
    ? res.send(particular)
    : res.status(404).send({ msg: "movie not fond" });
});

//delete
app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  //const particular = movies.find((movie) => movie.id == id);
  const result = await client
    .db("b40wd")
    .collection("movies")
    .deleteOne({ id: id });
  result.deletedCount > 0
    ? res.send({ msg: `deleated movie with id ${id} successfully` })
    : res.status(404).send({ msg: "Given id is not valid" });
  console.log("deleated");
});

//update
app.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const result = await client
    .db("b40wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: update });
  console.log(update);
  res.send(result);
});

//post
app.post("/movies", async (req, res) => {
  const newData = req.body;
  //console.log(newData);
  const add = await client.db("b40wd").collection("movies").insertMany(newData);
  res.send(add);
});

app.listen(PORT, () => console.log(`server is in the port${PORT}`));
