const db = require("../config/connection");
const Promise = require("promise");
const { resolve } = require("promise");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  addStudent: (data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("students")
        .insertOne(data)
        .then((response) => {
          console.log(response.ops[0]._id);
          resolve(response.ops[0]._id);
        });
    });
  },
  getStudent: (id) => {
    return new Promise(async (resolve, reject) => {
      let student = await db
        .get()
        .collection("students")
        .aggregate([
          {
            $match: { _id: ObjectId(id) },
          },
        ])
        .toArray();
      resolve(student);
    });
  },
  editStudent: (id, body) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("students")
        .updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              name: body.name,
              Register_Number: body.Register_Number,
              Subject1: body.Subject1,
              Subject2: body.Subject2,
              Subject3: body.Subject3,
              Total: body.Total,
            },
          }
        );
      resolve({ status: "successfully edited" });
    });
  },
  deleteStudent: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("students")
        .removeOne({ _id: ObjectId(id) });
      resolve({ status: "student deleted" });
    });
  },
  getall: () => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection("students")
        .find()
        .toArray()
        .then((resp) => {
          resolve(resp);
        });
    });
  },
};
