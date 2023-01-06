import { client } from "../index.js";
import bcrypt from "bcrypt";

export async function userSingUp(data) {
  return await client.db("b40wd").collection("users").insertOne(data);
}

// hash password
export async function generateHashPass(userPass) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPass = await bcrypt.hash(userPass, salt);
  return hashedPass;
}

export async function valadateUsername(username) {
  return await client
    .db("b40wd")
    .collection("users")
    .findOne({ username: username });
}
