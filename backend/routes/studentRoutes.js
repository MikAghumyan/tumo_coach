const express = require("express");
const router = express.Router();
const {
  createStudent,
  findStudents,
  findStudentById,
  workshopsByStudent,
  deleteStudent,
  updateStudent,
  addToWorkshop,
} = require("../controllers/studentController");
const authorize = require("../middlewares/authMiddleware");

router.route("/").get(authorize, findStudents).post(authorize, createStudent);
router
  .route("/:id")
  .get(authorize, findStudentById)
  .put(authorize, updateStudent)
  .delete(authorize, deleteStudent);
router.put("/:id/attach", authorize, addToWorkshop);
router.get("/:id/workshops", authorize, workshopsByStudent);

module.exports = router;
