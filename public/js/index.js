"use strict";
const { app, BrowserWindow, dialog } = require("electron");
const Server = require("./server");
var fs = require("fs");
//const path = require("path");
require("../ui/sass/global.sass");
function createWindows() {
    let mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        },
        show: false,
    });
    mainWindow.loadFile("../dist/index.html");
    mainWindow.webContents.openDevTools();
    mainWindow.setMenuBarVisibility(false);
    mainWindow.on("ready-to-show", () => mainWindow.show());
    console.log("hmr test succesfully");
}
app.whenReady().then(createWindows);
app.on("window-all-closed", function () {
    if (process.platform !== "darwin")
        app.quit();
});
process.on("uncaughtException", function (error) {
    // Handle the error
    app.quit();
});
