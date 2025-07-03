const foodRouter = require("./foodRoutes.js");
const authRouter = require("./authRoutes.js");
const express = require("express");
const router = express.Router();

router.use("/foods", foodRouter);
router.use("/auth", authRouter);

module.exports = router;
