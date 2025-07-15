const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const auth = require("../middleware/authMiddleware");

router.use(auth);
router.get("/", controller.getUser);

module.exports = router;
