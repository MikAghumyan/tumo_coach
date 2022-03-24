const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = 3000 || process.env.port;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("Must provide");
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`App is listening on port ${PORT}`);
});
