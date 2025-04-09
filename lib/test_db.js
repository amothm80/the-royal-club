import { savePost } from "../model/posts.js";
import { findUserByEmail } from "../model/users.js";

console.log(await findUserByEmail('amo.1980@gmail.com'))