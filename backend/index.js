const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorMiddleware");
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/workshops", require("./routes/workshopRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));

app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`App is listening on port ${PORT}`);
});
