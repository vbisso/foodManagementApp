const foodRouter = require("./foodRoutes.js");
const authRouter = require("./authRoutes.js");
const userRouter = require("./userRoutes.js");

const express = require("express");
const router = express.Router();

router.use("/foods", foodRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
module.exports = router;
