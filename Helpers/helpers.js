const { response } = require("express");
const Promise = require("promise");
const ObjectId = require("mongodb").ObjectId;
const Student = require("../models/students");

module.exports = {
  addStudent: (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      const student = new Student({
        name: data.name,
        Register_Number: data.Register_Number,
        Subject_1: data.Subject_1,
        Subject_2: data.Subject_2,
        Subject_3: data.Subject_3,
        total: data.total,
      });
      student
        .save()
        .then((result) => {
          console.log(result);
          resolve(result);
        })
        .catch((err) => console.log(err));
    });
  },
  getStudent: (id) => {
    return new Promise(async (resolve, reject) => {
      Student.findById({
        _id: id,
      })
        .exec()
        .then((student) => {
          console.log(student);
          resolve(student);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  editStudent: (id, body) => {
    return new Promise((resolve, reject) => {
      Student.update(
        { _id: id },
        {
          $set: {
            name: body.name,
            Register_Number: body.Register_Number,
            Subject_1: body.Subject_1,
            Subject_2: body.Subject_2,
            Subject_3: body.Subject_3,
            total: body.total,
          },
        }
      )
        .exec()
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          resolve({ status: "error" });
        });
    });
  },
  deleteStudent: (id) => {
    return new Promise((resolve, reject) => {
      Student.remove({ _id: id })
        .exec()
        .then((resposne) => {
          if (resposne) {
            resolve({ result: "student deleted" });
          }
        })
        .catch((err) => {
          console.log(err);
          resolve({ status: "error while deleteing" });
        });
    });
  },
  getall: () => {
    return new Promise(async (resolve, reject) => {
      await Student.find()
        .exec()
        .then((resp) => {
          console.log(resp);
          resolve({ response: resp });
        })
        .catch((err) => {
          console.log(err);
          resolve({ error: err });
        });
    });
  },
};
