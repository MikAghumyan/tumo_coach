const express = require("express");
const app = express();
const PORT = 3000 || process.env.port;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`App is listening on port ${port}`);
});
