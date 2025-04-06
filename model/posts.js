import { pool } from "../config/database.js";

export async function selectAllPostsWithPosterName() {
  return await pool.query(
    "SELECT posts.id, posts.subject,posts.content, posts.date_time, users.name FROM posts INNER JOIN users ON posts.poster = users.id;"
  );
}

// select posts.id, posts.subject,posts.content, posts.date_time, users.name from posts inner join users on posts.poster = users.id;
