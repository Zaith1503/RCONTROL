var _a = require("electron"), app = _a.app, BrowserWindow = _a.BrowserWindow;
var path = require("path");
app.on("ready", function () {
    var mainWindow = new BrowserWindow();
    mainWindow.loadFile(path.join(__dirname, "public/index.html"));
    mainWindow.webContents.openDevTools();
});
