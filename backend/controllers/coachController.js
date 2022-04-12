const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const Coach = require("../models/Coach");

module.exports = {
  register: asyncHandler(async (req, res) => {
    try {
      const { name, surname, email, password } = req.body;

      if (!name || !surname || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
      }

      const coachExists = await Coach.findOne({ email });

      if (coachExists) {
        res.status(400);
        throw new Error("Coach already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const coach = await Coach.create({
        name,
        surname,
        email,
        password: hashedPassword,
      });

      if (coach) {
        res.status(201).json({
          _id: coach.id,
          name: coach.name,
          surname: coach.surname,
          email: coach.email,
          token: generateToken(coach._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid coach data");
      }
    } catch (error) {
      throw new Error(error);
    }
  }),
  login: asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;

      const coach = await Coach.findOne({ email });
      if (!coach) {
        res.status(400);
        throw new Error("Invalid credentials");
      }
      const checkPassword = await bcrypt.compare(password, coach.password);

      if (coach && checkPassword)
        res.json({
          _id: coach.id,
          name: coach.name,
          surname: coach.surname,
          email: coach.email,
          token: generateToken(coach._id),
        });
      else {
        res.status(400);
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw new Error(error);
    }
  }),
  verify: asyncHandler(async (req, res) => {
    res.json("verify");
  }),
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" });
};
