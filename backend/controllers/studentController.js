const asyncHandler = require("express-async-handler");

const Student = require("../models/Student");
const Workshop = require("../models/Workshop.js");

module.exports = {
  createStudent: asyncHandler(async (req, res) => {
    try {
      const { name, surname, email, phoneNumber } = req.body;

      if (await Student.findOne({ email })) {
        res.status(401);
        throw new Error("Email already exists");
      }

      const student = await Student.create({
        name,
        surname,
        email,
        phoneNumber,
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
      const { search } = req.query;
      console.log(search);
      if (search) {
        const searchParts = search.split(" ");

        if (searchParts.length >= 2) {
          const students = await Student.find({
            $or: [
              {
                $and: [
                  { name: { $regex: searchParts[0], $options: "i" } },
                  { surname: { $regex: searchParts[1], $options: "i" } },
                ],
              },
              {
                $and: [
                  { name: { $regex: searchParts[1], $options: "i" } },
                  { surname: { $regex: searchParts[0], $options: "i" } },
                ],
              },
            ],
          });

          res.status(200).json({ students });
        } else {
          const students = await Student.find({
            $or: [
              { name: { $regex: searchParts[0], $options: "i" } },
              { surname: { $regex: searchParts[0], $options: "i" } },
            ],
          });

          res.status(200).json({ students });
        }
      } else {
        const students = await Student.find();

        res.status(200).json({ students });
      }
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  workshopsByStudent: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const workshopsByStudent = await Workshop.find({ students: id });
      res.status(200).send(workshopsByStudent);
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
  updateStudent: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const student = req.body;

      const studentWithEmail = await Student.findOne({ email: student.email });
      if (studentWithEmail && studentWithEmail.id !== id) {
        res.status(402);
        throw new Error("Email already exists");
      }

      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        student
      ).exec();
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
      const workshop = await Workshop.findOne({ name, level });

      if (!workshop) {
        res.status(401);
        throw new Error("Invalid Workshop");
      }

      const workshopUpdate = await Workshop.updateOne(
        { name, level },
        { $addToSet: { students: id } }
      );

      if (workshopUpdate.modifiedCount === 1) {
        res.status(200).json({ workshop });
      } else {
        res.status(401);
        throw new Error("Workshop already added");
      }
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }),
};
