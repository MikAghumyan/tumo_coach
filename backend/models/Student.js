const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: { type: String, unique: true },
  phoneNumber: String,
});

module.exports = mongoose.model("Student", StudentSchema);
