const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  workshops: [{ type: mongoose.Types.ObjectId, ref: "Workshop" }],
});

module.exports = mongoose.model("Student", StudentSchema);
