const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const {
  createWorkshop,
  createStudent,
  findWorkshops,
  findStudents,
  studentsByWorkshop,
  workshopsByStudent,
  addStudent,
  removeStudent,
} = require("./controller");

router.get("/workshops", findWorkshops);
router.get("/students", findStudents);
router.get("/workshop/students", studentsByWorkshop);
router.get("/student/workshops", workshopsByStudent);
router.post("/workshop", createWorkshop);
router.post("/student", createStudent);
router.put("/attach", addStudent);
// router.put("/detach", removeStudent);

module.exports = router;
