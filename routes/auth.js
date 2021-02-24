import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";

import { isLoggedIn, isNotLoggedIn } from "./middlewares.js";

import User from "../models/user.js";

const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, nex) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect("/join?error=exist");
        }

        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            passport: hash,
        });
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }

        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }

        return req.login(user, (loginError) => {
            if (loginError) {
                console.log(loginError);
                return next(loginError);
            }

            return res.redirect("/");
        });
    })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
});

router.get("/kakao", passport.authenticate("kakao"));

router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    (req, res) => {
        res.redirect("/");
    }
);

export default router;
