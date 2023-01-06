import express from "express";
import {
  userSingUp,
  generateHashPass,
  valadateUsername,
} from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signUp", async (req, res) => {
  const { username, password } = req.body;

  const checkUsername = await valadateUsername(username);

  console.log(checkUsername);

  if (checkUsername) {
    res.status(400).send({ msg: "username alerady exists in our db" });
  } else if (password.length < 8) {
    res.status(400).send({ msg: "password must be at least 8 chaaracter" });
  } else {
    const hashPass = await generateHashPass(password);
    const result = await userSingUp({ username: username, password: hashPass });
    res.send(result);
  }
});

router.post("/logIn", async (req, res) => {
  const { username, password } = req.body;

  const checkUsername = await valadateUsername(username);

  console.log(checkUsername);

  if (!checkUsername) {
    res.status(401).send({ msg: "invalid username or password" });
  } else {
    const storedDBPass = checkUsername.password;
    const isPasswordRight = await bcrypt.compare(password, storedDBPass);
    const token = jwt.sign({ id: checkUsername._id }, process.env.SECRET_KEY);
    if (isPasswordRight) {
      res.send({ msg: "successful login", token: token });
    } else {
      res.status(401).send({ msg: "invalid username or password" });
    }
  }
});

export default router;
