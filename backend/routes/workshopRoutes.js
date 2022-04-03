const express = require("express");
const router = express.Router();
const {
  createWorkshop,
  findWorkshops,
  findWorkshopById,
  studentsByWorkshop,
  addStudent,
  removeStudent,
  deleteWorkshop,
} = require("../controllers/workshopController");
const authorize = require("../middlewares/authMiddleware");

router.route("/").get(authorize, findWorkshops).post(authorize, createWorkshop);
router
  .route("/:id")
  .get(authorize, findWorkshopById)
  .delete(authorize, deleteWorkshop);
router.get("/:id/students", authorize, studentsByWorkshop);
router.put("/attach", authorize, addStudent);
router.put("/detach", authorize, removeStudent);

module.exports = router;
