const Promise = require("promise");
const bcrypt = require("bcrypt");
const Teacher = require("../models/teacher");
const mongoose = require("mongoose");
const Student = require("../models/students");
const { ObjectId } = require("mongodb");
module.exports = {
  doLogIn: (mail, password) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      await Teacher.find({ emailId: mail })
        .exec()
        .then((user) => {
          console.log(user);

          if (user[0]) {
            bcrypt.compare(password, user[0].password).then((status) => {
              if (status) {
                response.user = user;
                response.status = true;
                console.log("logged in");
                resolve(response);
              } else {
                console.log("failed");
                resolve({ status: false });
              }
            });
          } else {
            console.log("loggin failed");
            resolve({ status: false });
          }
        })
        .catch((err) => console.log(err));
    });
  },
};
