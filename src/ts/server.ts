const express = require("express");
//var http = require("http").Server(app);
//var io = require("socket.io")(http);

const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ejsLint = require("ejs-lint");

const App = express();

App.set("port", process.env.PORT || 3000);

// EJS

App.set("views", path.resolve("./src/views"));
App.set("view engine", "ejs");

//Archivos ESTÀTICOS

App.use(express.static("dist"));
App.use('/', express.static(__dirname + 'dist/main.css'));
App.use("/", express.static(__dirname + 'dist/main.js'));


App.use(morgan("dev"));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

// RUTAS

App.use('/', require('/src/routes/routes'));

// LISTEN ON PORT
App.listen(App.get("port"), () => {
  console.log(`Servidor en puerto ${App.get("port")}`);
  console.log("Presiona CTRL + C para salir");
});

export default App;
