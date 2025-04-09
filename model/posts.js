import { pool } from "../config/database.js";

export async function selectAllPostsWithPosterName() {
  return await pool.query(
    "SELECT posts.id, posts.subject,posts.content, posts.date_time, users.name FROM posts INNER JOIN users ON posts.poster = users.id;"
  );
}
//  (to_timestamp(${Date.now()} / 1000.0))`
export async function  savePost(subject, content, user){
    return await pool.query(
        "INSERT INTO posts (subject, content,date_time,poster) values($1,$2,to_timestamp($3/1000.0),$4)",[subject,content,Date.now(),user]
    )
}

export async function deletePostById(postId){
  return await pool.query(
    "DELETE FROM posts WHERE id = $1",[postId]
  )
}

// select posts.id, posts.subject,posts.content, posts.date_time, users.name from posts inner join users on posts.poster = users.id;
