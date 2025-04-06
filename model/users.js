import { pool } from "../config/database.js";

export async function addUserToUsers(email, name, hash, salt) {
  await pool.query(
    "INSERT INTO users (email,name, hash, salt) VALUES ($1, $2, $3,$4)",
    [email, name, hash, salt]
  );
}

export async function findUserByEmail(email) {
  return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
}

export async function findUserById(id){
  return await pool.query("select * from users where id = $1", [
    id,
  ]);
}
