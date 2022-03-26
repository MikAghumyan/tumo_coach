const express = require("express");
const router = express.Router();
const {
  createStudent,
  findStudents,
  findStudentById,
  workshopsByStudent,
} = require("../controllers/studentController");

router.route("/").get(findStudents).post(createStudent);
router.get("/:id", findStudentById);
router.get("/:id/workshops", workshopsByStudent);

module.exports = router;
