import express from "express";
import signInRouter from "./auth/signinRoute";
import websiteRoute from "./websites/websiteRoute";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use('/auth', signInRouter);
router.use('/website', websiteRoute);

export default router;