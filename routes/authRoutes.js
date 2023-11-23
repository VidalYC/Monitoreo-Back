const express = require("express");

const checkAuth = require("../middleware/checkAuth");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.getAllUser);
router.post("/signin", authController.signIn);

router.post("/signup", authController.signUp);

router.patch("/:userId", authController.updateOneUser);

module.exports = router;