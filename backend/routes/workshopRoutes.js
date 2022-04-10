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
  updateWorkshop,
} = require("../controllers/workshopController");
const authorize = require("../middlewares/authMiddleware");

router.route("/").get(authorize, findWorkshops).post(authorize, createWorkshop);
router.put("/detach", authorize, removeStudent);
router
  .route("/:id")
  .get(authorize, findWorkshopById)
  .put(authorize, updateWorkshop)
  .delete(authorize, deleteWorkshop);
router.put("/:id/attach", authorize, addStudent);
router.get("/:id/students", authorize, studentsByWorkshop);

module.exports = router;
