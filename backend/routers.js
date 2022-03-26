const express = require("express");
const router = express.Router();
const {
  createWorkshop,
  createStudent,
  findWorkshops,
  findWorkshopById,
  findStudents,
  findStudentById,
  studentsByWorkshop,
  workshopsByStudent,
  addStudent,
  removeStudent,
} = require("./controller");

router.route("/workshops").get(findWorkshops).post(createWorkshop);
router.get("/workshops/:id", findWorkshopById);
router.get("/workshops/:id/students", studentsByWorkshop);
router.route("/students").get(findStudents).post(createStudent);
router.get("/workshops/:id", findStudentById);
router.get("/students/:id/workshops", workshopsByStudent);
router.put("/attach", addStudent);
router.put("/detach", removeStudent);

module.exports = router;
