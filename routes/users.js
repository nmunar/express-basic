var express = require("express");
var router = express.Router();
var [createUser, login] = require("../controllers/users.js");

/* Create user. */
router.post("/register", async function (req, res, next) {
  const newUser = await createUser(req.body);
  if (newUser) {
    res.send(newUser);
  } else {
    // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
    res.send(403).json({
      success: false,
      message: "Incorrect username or password",
    });
  }
});
/** Login */
router.post("/login", async function (req, res, next) {
  try{const authUser = await login(req.body);
    res.send(authUser);
  }
    catch(error){
      res.send(403).json({
        success: false,
        message: "Incorrect username or password",
      });
    }
  
});

module.exports = router;
