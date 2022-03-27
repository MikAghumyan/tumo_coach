const Coach = require("../models/Coach");

module.exports = {
  register: async (req, res) => {
    res.json("register");
  },
  login: async (req, res) => {
    res.json("login");
  },
  verify: async (req, res) => {
    res.json("verify");
  },
};
