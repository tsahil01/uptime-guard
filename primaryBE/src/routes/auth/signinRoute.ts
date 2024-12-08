import { z } from "zod";
import { db, jwtsecret } from "../..";
import jwt from "jsonwebtoken";
import express from "express";

const zodUserSchema = {
    email: z.string().email(),
    password: z.string().min(6),
};

const signInRouter = express.Router();

signInRouter.post('/signup', async (req, res) => {
    try {
        const { email, password } = z.object(zodUserSchema).parse(req.body);
        const user = await db.user.create({
            data: {
                email: email,
                password: password,
            },
        });

        res.json({
            user,
            msg: "Sign up successful. Please sign in.",
        });
    } catch (error: any) {
        res.json({
            message: "Sign up failed",
            error: error,
        });
    }
})

signInRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = z.object(zodUserSchema).parse(req.body);
        const user = await db.user.findUnique({
            where: {
                email: email,
                password: password,
            },
        });

        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        const token = jwt.sign({
            userId: user.id,
        }, jwtsecret);

        res.json({
            token,
            msg: "Sign in successful",
        })
    } catch (error: any) {
        res.json({
            message: "Sign in failed",
            error: error,
        })
    }
});

export default signInRouter;