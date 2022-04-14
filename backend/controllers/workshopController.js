const asyncHandler = require("express-async-handler");

const Student = require("../models/Student");
const Workshop = require("../models/Workshop.js");

module.exports = {
  createWorkshop: asyncHandler(async (req, res) => {
    try {
      const { name, description, level } = req.body;

      if (await Workshop.findOne({ name, level })) {
        res.status(401);
        throw new Error("Workshop already exists");
      }

      const workshop = await Workshop.create({
        name,
        description,
        level,
        students: [],
      });
      res.status(200).json({ workshop });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  deleteWorkshop: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const workshop = await Workshop.findByIdAndDelete(id);
      const students = await Student.updateMany(
        { workshops: id },
        { $pull: { workshops: id } }
      );
      res.status(200).json({ workshop, students });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  findWorkshops: asyncHandler(async (req, res) => {
    try {
      const { search } = req.query;
      console.log(search);
      if (search) {
        const workshops = await Workshop.find({
          name: { $regex: search, $options: "i" },
        });

        res.status(200).json({ workshops });
      } else {
        const workshops = await Workshop.find();

        res.status(200).json({ workshops });
      }
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
      const studentsByWorkshop = await Workshop.findById(id).populate(
        "students"
      );
      res.status(200).send(studentsByWorkshop.students);
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  updateWorkshop: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const workshop = req.body;

      const otherWorkshop = await Workshop.findOne({
        name: workshop.name,
        level: workshop.level,
      });
      if (otherWorkshop && otherWorkshop.id !== id) {
        res.status(402);
        throw new Error("Workshop already exists");
      }

      const updatedWorkshop = await Workshop.findByIdAndUpdate(
        id,
        workshop
      ).exec();
      res.status(200).json(updatedWorkshop);
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  addStudent: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { email } = req.body;

      const student = await Student.findOneAndUpdate(
        { email },
        {
          $addToSet: { workshops: id },
        }
      ).exec();

      if (!student) {
        res.status(401);
        throw new Error("Invalid Student");
      }

      const workshop = await Workshop.findByIdAndUpdate(id, {
        $addToSet: { students: student._id },
      }).exec();

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
      if (!student) {
        res.status(401);
        throw new Error("Invalid student email");
      }

      const workshop = await Workshop.findByIdAndUpdate(workshopId, {
        $pull: { students: studentId },
      }).exec();
      res.status(200).json({ workshop, student });
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
};
