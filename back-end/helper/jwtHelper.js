"use strict";
let jwt = require("jsonwebtoken");

//Tạo token
exports.generateToken = function (user, secretSignature, tokenLife) {
  return new Promise((resolve, reject) => {
    //Dữ liệu user lưu vào token
    const userData = user;

    //Sinh token
    jwt.sign(
      {
        data: userData,
      },
      secretSignature,
      {
        //Thuật toán mã hóa
        algorithm: "HS256",

        //Thời gian sống của token
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

// Kiểm tra token
exports.verifyToken = function (token, secretKey) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};
