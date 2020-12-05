require("dotenv").config();
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const {
  addStudent,
  getStudent,
  editStudent,
  deleteStudent,
} = require("../Helpers/helpers");
const { doLogIn } = require("../Helpers/userhelpers");
const Student = require("../models/students");
const mongoose = require("mongoose");
const { response } = require("express");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // console.log(req.headers);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
function generateAccesstoken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
}
let refershTokens = [];
/* GET home page. */
router.post("/login", (req, res) => {
  doLogIn(req.body.email, req.body.password).then((resposne) => {
    // console.log(resposne);
    if (resposne.status) {
      const username = resposne.user.username;
      console.log(username);
      const user = { name: username };
      console.log(req.headers);
      const accessToken = generateAccesstoken(user);
      const refershToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refershTokens.push(refershToken);
      res.json({
        loginstatus: "Login Success",
        accessToken: accessToken,
        refershToken: refershToken,
      });
    } else {
      res.json({ status: "incorrect username or password" });
    }
  });
});
router.delete("/logout", (req, res) => {
  // console.log(req.body.token);
  refershTokens = refershTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refershTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccesstoken({ name: user.name });
    res.json({ accessToken });
  });
});
router.post("/addstudent", authenticateToken, (req, res) => {
  // console.log(req.body);

  addStudent(req.body).then((resposne) => {
    res.json({ response: resposne, status: "data inserted Successfully" });
  });
});
router.get("/editstudent", authenticateToken, (req, res) => {
  // console.log(req.body.id);

  getStudent(req.body.id).then((student) => {
    res.status(200);
    res.json({ student });
  });
});
router.put("/editstudent", authenticateToken, (req, res) => {
  console.log(req.body);
  // const updateOps = {}
  // for (const ops of req.body)
  editStudent(req.body._id, req.body).then((resposne) => {
    console.log(resposne);
    if (resposne.status) return res.json({ resposne: "Error while editing" });

    res.json({ resposne: resposne });
  });
});
router.delete("/deletestudent", authenticateToken, (req, res) => {
  deleteStudent(req.body._id).then((resposne) => {
    if (resposne.status) {
      return res.status(500).json({ response: resposne.status });
    } else {
      res.status(202).json({ resposne: resposne.result });
    }
  });
});
module.exports = router;
