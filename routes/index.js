var express = require("express");
var router = express.Router();

var middelware = require("../lib/utils/auth.js");
var HandlerGenerator = require("../controllers/users.js");
/* GET home page. */
router.get("/", middelware.checkToken, function (req, res, next) {
  res.render("index", { title: "Express" });
});

/** Login */
router.post("/login", async function (req, res, next) {
  const authUser = await login(req.body);
  res.send(authUser);
});

module.exports = router;
