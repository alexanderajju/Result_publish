const { response } = require("express");
var express = require("express");
const { getall } = require("../Helpers/helpers");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  getall().then((response) => {
    res.json(response);
  });
});

module.exports = router;
