//in this file we write all the qeryes for the database

import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function insertMovie(newData) {
  return await client.db("b40wd").collection("movies").insertMany(newData);
}

export async function updateMovieById(id, update) {
  return await client
    .db("b40wd")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: update });
}

export async function deleteMovieById(id) {
  return await client
    .db("b40wd")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}

export async function getMovieById(id) {
  return await client
    .db("b40wd")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}

export async function getAllMovies(req) {
  return await client
    .db("b40wd")
    .collection("movies")
    .find(req.query)
    .toArray();
}
