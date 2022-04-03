const asyncHandler = require("express-async-handler");

const Student = require("../models/Student");
const Workshop = require("../models/Workshop.js");

module.exports = {
  createStudent: asyncHandler(async (req, res) => {
    try {
      const { name, surname } = req.body;
      const student = await Student.create({ name, surname, students: [] });
      res.status(200).json({ student });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  deleteStudent: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findByIdAndDelete(id);
      const workshops = await Workshop.updateMany(
        { students: id },
        { $pull: { students: id } }
      );
      res.status(200).json({ student, workshops });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  findStudentById: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);
      res.status(200).json({ student });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  findStudents: asyncHandler(async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json({ students });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  workshopsByStudent: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.params);
      const workshopsByStudent = await Student.findById(id).populate(
        "workshops"
      );
      res.status(200).send(workshopsByStudent.workshops);
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
};
