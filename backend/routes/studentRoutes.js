const express = require("express");
const router = express.Router();
const {
  createStudent,
  findStudents,
  findStudentById,
  workshopsByStudent,
  deleteStudent,
} = require("../controllers/studentController");
const authorize = require("../middlewares/authMiddleware");

router.route("/").get(authorize, findStudents).post(authorize, createStudent);
router
  .route("/:id")
  .get(authorize, findStudentById)
  .delete(authorize, deleteStudent);
router.get("/:id/workshops", authorize, workshopsByStudent);

module.exports = router;
