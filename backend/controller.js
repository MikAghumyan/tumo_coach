const Student = require("./ models/Student");
const Workshop = require("./ models/Workshop.js");

module.exports = {
  createWorkshop: async (req, res) => {
    console.log(req.body);
    const { name, description, level } = req.body;
    const workshop = await Workshop.create({
      name,
      description,
      level,
      students: [],
    });
    res.status(200).json({ workshop });
  },
  createStudent: async (req, res) => {
    const { name, surname } = req.body;
    const student = await Student.create({ name, surname, students: [] });
    res.status(200).json({ student });
  },
  findWorkshops: async (req, res) => {
    const workshops = await Workshop.find();
    res.status(200).json({ workshops });
  },
  findStudents: async (req, res) => {
    const students = await Student.find();
    res.status(200).json({ students });
  },
  studentsByWorkshop: async (req, res) => {
    const { id } = req.query;
    console.log(req.query);
    const studentsByWorkshop = await Workshop.findById(id).populate("students");
    res.status(200).send(studentsByWorkshop.students);
  },
  workshopsByStudent: async (req, res) => {
    const { id } = req.query;
    console.log(req.query);
    const workshopsByStudent = await Student.findById(id).populate("workshops");
    res.status(200).send(workshopsByStudent.workshops);
  },
  addStudent: async (req, res) => {
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
  },
  // removeStudent: async (req, res) => {
  //   console.log(req.body, req.params);
  // },
};
