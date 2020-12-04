const db = require("../config/connection");
const Promise = require("promise");
const bcrypt = require("bcrypt");

module.exports = {
  doLogIn: (mail, password) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection("teacher")
        .findOne({ emailid: mail });
      if (user) {
        bcrypt.compare(password, user.password).then((status) => {
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
    });
  },
};
