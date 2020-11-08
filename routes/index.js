var express = require("express");
var router = express.Router();
var auth = require("../lib/utils/auth.js");
var [getUser]= require("../controllers/users.js");
/* GET user by master role page. */
router.get("/users", auth.checkTokenMaster, async function (req, res, next) {
  const users = await getUser(req.body);
  res.send(users);
});


module.exports = router;
