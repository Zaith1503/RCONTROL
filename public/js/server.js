"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as express from "express";
const express = require("express");
//var http = require("http").Server(app);
//var io = require("socket.io")(http);
const path = require('path');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const App = express();
App.set("port", process.env.PORT || 3001);
App.set("views", path.join(__dirname, "views"));
App.set("view engine", "ejs");
App.use(morgan("dev"));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));
App.get("/", function (req, res) {
    res.send("ACTION!!");
    //res.sendFile(__dirname + "/index.html");
});
App.listen(App.get("port"), () => {
    console.log(`Servidor en puerto ${App.get("port")}`);
});
module.exports = App;
