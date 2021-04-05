"use strict";
let AuthMiddleWare = require("../../middleware/authMiddleware");
module.exports = function (app) {
  let authCtr = require("../controllers/authController");

  //API đăng nhập
  app.route("/login").post(authCtr.login);

  //API refresh token
  app.route("/refreshtoken").post(authCtr.refreshToken);
};
