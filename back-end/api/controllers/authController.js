"use strict";
let jwtHelper = require("../../helper/jwtHelper");

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "5m";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "KEY";

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "30d";

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "KEY";

let example_user = {
  admin: {
    password: "admin",
  },
};

exports.login = async function (req, res) {
  try {
    let username = req.body.username;
    let password = req.body.password;

    if (
      !example_user[username] ||
      example_user[username].password != password
    ) {
      return res.status(401).json({
        message: "Username and Password are incorrect",
      });
    }

    let userData = {
      username: username,
    };

    //Sinh access token
    const accessToken = await jwtHelper.generateToken(
      userData,
      accessTokenSecret,
      accessTokenLife
    );
    //Sinh refreshToken
    const refreshToken = await jwtHelper.generateToken(
      userData,
      refreshTokenSecret,
      refreshTokenLife
    );
    //Lưu lại token
    tokenList[refreshToken] = {
      accessToken,
      refreshToken,
    };
    //Trả token cho người dùng
    return res.status(200).json({
      accessToken,
      refreshToken,
      userData,
    });
  } catch (error) {
    //Trả về nếu gặp lỗi
    console.log(error);
    return res.status(500).json(error);
  }
};

//Cung cấp lại access token
exports.refreshToken = async function (req, res) {
  //Nhận refresh token
  const refreshTokenFromClient = req.body.refreshToken;

  //Kiểm tra token
  if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
    try {
      const decoded = await jwtHelper.verifyToken(
        refreshTokenFromClient,
        refreshTokenSecret
      );
      const userData = decoded.data;
      //Sinh asscess token mới
      const accessToken = await jwtHelper.generateToken(
        userData,
        accessTokenSecret,
        accessTokenLife
      );
      return res.status(200).json({
        accessToken,
      });
    } catch (error) {
      //Refresh token không đúng
      res.status(403).json({
        message: "Invalid refresh token.",
      });
    }
  } else {
    return res.status(403).send({
      //Không gửi token
      message: "No token provided.",
    });
  }
};

//Đăng xuất
exports.logout = async function (req, res) {
  //Nhận refresh token
  const refreshTokenFromClient = req.body.refreshToken;
  if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
    try {
      // Xóa các token đã lưu
      delete tokenList[refreshTokenFromClient];
      return res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      res.status(403).json({
        //Sai token
        message: "Invalid refresh token.",
      });
    }
  } else {
    return res.status(403).send({
      //Không gửi token
      message: "No token provided.",
    });
  }
};
