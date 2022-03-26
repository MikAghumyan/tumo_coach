const Student = require("./ models/Student");
const Workshop = require("./ models/Workshop.js");
const asyncHandler = require("express-async-handler");

module.exports = {
  createWorkshop: asyncHandler(async (req, res) => {
    try {
      console.log(req.body);
      const { name, description, level } = req.body;
      const workshop = await Workshop.create({
        name,
        description,
        level,
        students: [],
      });
      res.status(200).json({ workshop });
    } catch (error) {
      res.status(401);
      throw new Error("please add all the information");
    }
  }),
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
  findWorkshops: asyncHandler(async (req, res) => {
    try {
      const workshops = await Workshop.find();
      res.status(200).json({ workshops });
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
  studentsByWorkshop: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.params);
      const studentsByWorkshop = await Workshop.findById(id).populate(
        "students"
      );
      res.status(200).send(studentsByWorkshop.students);
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
  addStudent: asyncHandler(async (req, res) => {
    try {
      console.log(req.body, req.params);
      const { studentId, workshopId } = req.body;

      const student = await Student.findByIdAndUpdate(studentId, {
        $push: { workshops: workshopId },
      }).exec();
      const workshop = await Workshop.findByIdAndUpdate(workshopId, {
        $push: { students: studentId },
      }).exec();
      console.log(student, workshop);

      res.status(200).json({ workshop, student });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  removeStudent: asyncHandler(async (req, res) => {
    try {
      const { studentId, workshopId } = req.body;
      const student = await Student.findByIdAndUpdate(studentId, {
        $pull: { workshops: workshopId },
      }).exec();
      const workshop = await Workshop.findByIdAndUpdate(workshopId, {
        $pull: { students: studentId },
      }).exec();
      console.log(student, workshop);
      res.status(200).json({ workshop, student });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
};
