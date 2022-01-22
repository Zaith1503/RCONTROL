import { app, BrowserWindow, ipcMain } from "electron";

import fs from "fs";
import path from "path";
const url = require("url");
const Server = require('./server');
require("../ui/sass/global.sass");

function createWindows() {
  let mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      //nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
    },
    show: false,
  });

  mainWindow.loadURL("http://localhost:3000/");
  mainWindow.loadFile("../dist/index.html");
  mainWindow.webContents.openDevTools();
  mainWindow.setMenuBarVisibility(false);
  mainWindow.on("ready-to-show", () => mainWindow.show());

  console.log("hmr test succesfully");
}

app.whenReady().then(createWindows);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
