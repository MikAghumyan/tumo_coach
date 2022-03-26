const express = require("express");
const router = express.Router();

const {
  createWorkshop,
  findWorkshops,
  findWorkshopById,
  studentsByWorkshop,
  addStudent,
  removeStudent,
} = require("../controllers/workshopController");

router.route("/").get(findWorkshops).post(createWorkshop);
router.get("/:id", findWorkshopById);
router.get("/:id/students", studentsByWorkshop);
router.put("/attach", addStudent);
router.put("/detach", removeStudent);

module.exports = router;
