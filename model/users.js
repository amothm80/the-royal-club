import { pool } from "../config/database.js";

export async function addUserToUsers(email, name, hash, salt, member, admin) {
  await pool.query(
    "INSERT INTO users (email,name, hash, salt, member, admin) VALUES ($1, $2, $3,$4,$5,$6)",
    [email, name, hash, salt, member, admin]
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
