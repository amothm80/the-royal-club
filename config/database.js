
import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
// let ssl = false;
// console.log(process.env.SSL)
// console.log(Boolean(process.env.SSL))
// if (Boolean(process.env.SSL)){
//   ssl = true
// }
// console.log(ssl)
export const pool = new Pool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  database: process.env.DB,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  ssl:process.env.SSL === 'true'?true:false,
});
