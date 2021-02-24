"use strict";
import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

import User from "./user.js";
import Post from "./post.js";
import Hashtag from "./hashtag.js";

const rawdata = fs.readFileSync(path.join(process.cwd(), "config/config.json"));
const config = JSON.parse(rawdata);

const env = process.env.NODE_ENV || "development";
const db = {};
const sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    config[env]
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

export default db;
