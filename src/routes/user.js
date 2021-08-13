const express = require("express");
const router = express.Router();
const {
  registerHandler,
  loginHandler,
  logoutHandler,
} = require("../controllers/userController");

/**
 * @description register handler
 * @method POST /signup
 */
router.post("/signup", registerHandler);

/**
 * @description login handler
 * @method POST /login
 */
router.post("/login", loginHandler);

/**
 * @description logout handler
 * @method GET /logout
 */
router.get("/logout", logoutHandler);

module.exports = router;
