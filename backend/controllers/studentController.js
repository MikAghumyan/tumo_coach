const asyncHandler = require("express-async-handler");

const Student = require("../models/Student");
const Workshop = require("../models/Workshop.js");

module.exports = {
  createStudent: asyncHandler(async (req, res) => {
    try {
      const { name, surname, email, phoneNumber } = req.body;
      const student = await Student.create({
        name,
        surname,
        email,
        phoneNumber,
        workshops: [],
      });
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
  updateStudent: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const student = req.body;
      const updatedStudent = await Student.findByIdAndUpdate(id, {
        name: student.name,
        surname: student.surname,
        email: student.email,
        phoneNumber: student.phoneNumber,
      }).exec();
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  addToWorkshop: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, level } = req.body;

      const workshop = await Workshop.findOneAndUpdate(
        { name, level },
        {
          $addToSet: { students: id },
        }
      ).exec();
      const student = await Student.findByIdAndUpdate(id, {
        $addToSet: { workshops: workshop._id },
      }).exec();

      res.status(200).json({ workshop, student });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
};
