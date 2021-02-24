import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { Post, Hashtag } from "../models/index";
import { isLoggedIn } from "./middlewares";

const router = express.Router();

try {
    fs.readdirSync("uploads");
} catch (error) {
    console.error("uploads 폴더 생성");
    fs.mkdirSync("uploads");
}
