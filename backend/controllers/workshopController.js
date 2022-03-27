const asyncHandler = require("express-async-handler");

const Student = require("../models/Student");
const Workshop = require("../models/Workshop.js");

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
  findWorkshops: asyncHandler(async (req, res) => {
    try {
      const workshops = await Workshop.find();
      res.status(200).json({ workshops });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  findWorkshopById: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const workshop = await Workshop.findById(id);
      res.status(200).json({ workshop });
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
