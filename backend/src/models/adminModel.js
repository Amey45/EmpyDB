const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var adminSchema = new Schema({
  Company_Name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("companies", adminSchema);
