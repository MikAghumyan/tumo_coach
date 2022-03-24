const mongoose = require("mongoose");

const WorkshopSchema = new mongoose.Schema({
  name: String,
  description: String,
  level: Number,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Workshop", WorkshopSchema);
