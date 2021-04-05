"use strict";

//Load các config từ file .env
require("dotenv").config();

//Tạo server bằng express
let express = require("express"),
  app = express(),
  //Cổng chạy của ứng dụng
  port = process.env.PORT || 3000,
  cors = require("cors");

//Sử dụng middleware cors
app.use(cors());

//Prase body của request thành object
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Route
let routes = require("./api/routes/routes");
routes(app);

//trả về 404 nếu đường dẫn không tồn tại
app.use(function (req, res) {
  res.status(404).send({
    url: req.originalUrl + " not found",
  });
});

//Start
app.listen(port);
