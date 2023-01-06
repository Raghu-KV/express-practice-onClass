//in this file we write all the qeryes for the database

import { client } from "../index.js";

export async function insertMovie(newData) {
  return await client.db("b40wd").collection("movies").insertMany(newData);
}

export async function updateMovieById(id, update) {
  return await client
    .db("b40wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: update });
}

export async function deleteMovieById(id) {
  return await client.db("b40wd").collection("movies").deleteOne({ id: id });
}

export async function getMovieById(id) {
  return await client.db("b40wd").collection("movies").findOne({ id: id });
}

export async function getAllMovies(req) {
  return await client
    .db("b40wd")
    .collection("movies")
    .find(req.query)
    .toArray();
}
