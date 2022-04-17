const mongoose = require("mongoose");

const WorkshopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  level: { type: Number, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Workshop", WorkshopSchema);
