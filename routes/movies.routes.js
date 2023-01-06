import express from "express";
import {
  getAllMovies,
  getMovieById,
  deleteMovieById,
  updateMovieById,
  insertMovie,
} from "../services/movies.service.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }

  const particular = await getAllMovies(req);

  res.send(particular);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  //const particular = movies.find((movie) => movie.id == id);
  const particular = await getMovieById(id);
  particular
    ? res.send(particular)
    : res.status(404).send({ msg: "movie not fond" });
});

//delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  //const particular = movies.find((movie) => movie.id == id);
  const result = await deleteMovieById(id);
  result.deletedCount > 0
    ? res.send({ msg: `deleated movie with id ${id} successfully` })
    : res.status(404).send({ msg: "Given id is not valid" });
  console.log("deleated");
});

//update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const result = await updateMovieById(id, update);
  console.log(update);
  res.send(result);
});

//post
router.post("/", async (req, res) => {
  const newData = req.body;
  //console.log(newData);
  const add = await insertMovie(newData);
  res.send(add);
});

export default router;
