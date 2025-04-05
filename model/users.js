import { pool } from "../config/database.js";

export async function addUserToUsers(email, name, hash, salt) {
  await pool.query(
    "INSERT INTO users (email,name, hash, salt) VALUES ($1, $2, $3,$4)",
    [email, name, hash, salt]
  );
}
