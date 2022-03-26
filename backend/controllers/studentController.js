const Student = require("../models/Student");
const Workshop = require("../models/Workshop.js");

module.exports = {
  createStudent: async (req, res) => {
    try {
      const { name, surname } = req.body;
      const student = await Student.create({ name, surname, students: [] });
      res.status(200).json({ student });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  },
  findStudentById: async (req, res) => {
    try {
      const { id } = req.params;
      const workshop = await Workshop.findById(id);
      res.status(200).json({ workshop });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  },
  findStudents: async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json({ students });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  },
  workshopsByStudent: async (req, res) => {
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
  },
};
