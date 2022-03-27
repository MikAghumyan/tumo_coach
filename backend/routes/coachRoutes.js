const express = require("express");
const router = express.Router();

const { register, login, verify } = require("../controllers/coachController");

router.post("/", register);
router.post("/login", login);
router.post("/verify", verify);

module.exports = router;
