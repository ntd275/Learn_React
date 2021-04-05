"use strict";

//Middleware để kiểm tra token
let jwtHelper = require("../helper/jwtHelper");

//Key bí mật cần bảo mật
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "KEY";

exports.isAuth = async function (req, res, next) {
  //Lấy token từ body
  const tokenFromClient = req.body.token || req.headers["x-access-token"];
  if (tokenFromClient) {
    try {
      // Kiểm tra token
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenSecret
      );
      req.jwtDecoded = decoded;
      // Nếu hợp lệ thì cho tiếp tục thực hiện
      next();
    } catch (error) {
      // Token không đúng
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    //Không có token
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};
