const { app, BrowserWindow } = require('electron');
const path = require('path');
require('./ipc');

let mainWindow = null;
const createWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      webSecurity: false
    }
  });

  const startUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : path.join(__dirname, "/build/index.html");
    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});