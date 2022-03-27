const express = require("express");
const router = express.Router();
const {
  createStudent,
  findStudents,
  findStudentById,
  workshopsByStudent,
} = require("../controllers/studentController");
const authorize = require("../middlewares/authMiddleware");

router.route("/").get(authorize, findStudents).post(authorize, createStudent);
router.get("/:id", authorize, findStudentById);
router.get("/:id/workshops", authorize, workshopsByStudent);

module.exports = router;
