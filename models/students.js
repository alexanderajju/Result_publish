const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  Register_Number: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  Subject_1: {
    type: Number,
    required: true,
    unique: false,
  },
  Subject_2: {
    type: Number,
    required: true,
    unique: false,
  },
  Subject_3: {
    type: Number,
    required: true,
    unique: false,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
